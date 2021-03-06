selectField = Luca.register   "Luca.fields.SelectField"

selectField.extends           "Luca.core.Field"

selectField.triggers          "after:select",
                              "on:change"

selectField.publicConfiguration
  # Enables multi-select UI element.
  allowMultiple: false

  # Includes a blank option in addition to all of the items
  # in the underlying collection.  Defaults to `true` 
  includeBlank: true

  # determines which value is sent when 
  # the blank option is selected?
  blankValue: ''

  # Determines the text displayed when 
  # the blank option is selected 
  blankText: 'Select One'

  # Specifying a value for maxDisplayLength will truncate
  # values displayed in the select field when they reach 
  # past a certain point, using the _.str truncate method.
  # Leave at 0 if you want to keep this feature disabled.
  maxDisplayLength: 0 

  # When the underlying collection is reset and we re-render
  # the options elements, should we keep the value that was set
  # on this field prior to that? Defaults to `true` unless otherwise
  # specified.
  retainValue: undefined

  # Determines which value is rendered in the label element that gets
  # rendered along with this control group. 
  label: undefined

selectField.privateConfiguration
  template: "fields/select_field"
  events:
    "change select" : "change_handler"

selectField.publicMethods
  # sets the value of this select field.
  setValue: (value)->
    @currentValue = value
    Luca.core.Field::setValue.apply @, arguments

  # returns the value of the select field.  runs
  # the value through the getParsedValue method which
  # enforces the valueType type conversion.
  getValue: ()->
    raw = @getInputElement()?.val()

    if @allowMultiple
      _.map raw, (value)=>
        @getParsedValue(value)
    else
      @getParsedValue(raw)

selectField.privateMethods
  initialize: (@options={})->
    _.extend @, @options
    _.extend @, Luca.concerns.Deferrable
    _.bindAll @, "change_handler"

    if _.isArray(@collection)
      @collection = data: @collection

    Luca.core.Field::initialize.apply @, arguments

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @valueType ||= Luca.config.idAttributeType if @valueField is "id"
    @label ||= @name
    @retainValue = true unless @retainValue? 

  afterInitialize: ()->
    if @collection?.data
      @valueField ||= "id"
      @displayField ||= "name"
      @sortOptionsBy ||= @displayField
      @parseData()

    try
      @configure_collection( @setAsDeferrable )
    catch e
      console.log "Error Configuring Collection", @, e.message

    @collection?.bind "before:fetch", @beforeFetch, @
    @collection?.bind "reset", @populateOptions, @

  # if the select field is configured with a data property
  # then parse that data into the proper format.  either
  # an array of objects with the valueField and displayField
  # properties, or an array of arrays with [valueField, displayField]
  parseData: ()->
    @collection.data = _( @collection.data ).map (record)=>
      return record if not _.isArray( record )

      hash = {}
      hash[ @valueField ] = record[0]
      hash[ @displayField ] = record[1] || record[0]

      hash

  getInputElement: ()->
    @input ||= @$('select').eq(0)

  afterRender: ()->
    if @collection?.models?.length > 0
      @populateOptions()
    else
      @collection?.trigger("reset")

  beforeFetch: ()->
    @resetOptions()

  change_handler: (e)->
    @trigger "on:change", @, e

  resetOptions: ()->
    @getInputElement().html('')

    if @allowMultiple
      @getInputElement().attr(multiple: true)
    else if @includeBlank
      @getInputElement().append("<option value='#{ @blankValue }'>#{ @blankText }</option>")

  populateOptions: ()->
    @resetOptions()

    if @collection?.length > 0
      if @sortOptionsBy?
        models = @collection.sortBy (model)=>
          if model.read?
            model.read( @sortOptionsBy )
          else
            model.get( @sortOptionsBy )
      else
        models = @collection.models

      for model in models
        v = model.read?( @valueField ) || model.get(@valueField)
        d = model.read?( @displayField ) || model.get(@displayField)

        if @maxDisplayLength and @maxDisplayLength > 0
          d = _.str.truncate(d, @maxDisplayLength)

        selected = "selected" if @selected and v is @selected
        option = "<option #{ selected } value='#{ v }'>#{ d }</option>"
        @getInputElement().append( option )

    @trigger "after:populate:options", @
    @setValue( @currentValue )

selectField.register()
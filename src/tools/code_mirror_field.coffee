defaultOptions =
  readOnly: false
  lineNumbers: true
  gutter: true
  autofocus: false
  passDelay: 50
  autoClearEmptyLines: true
  smartIndent: false
  tabSize: 2
  electricChars: false

Luca.define("Luca.tools.CodeMirrorField").extends("Luca.components.Panel").with
  bodyClassName: "codemirror-wrapper"

  codemirrorOptions: ()->
    options = _.clone( defaultOptions )

    customOptions =
      mode: @mode || "coffeescript"
      theme: @theme || "monokai"
      keyMap: @keyMap || "basic"
      onChange: @onEditorChange || ()-> true
      lineNumbers: if @lineNumbers? then @lineNumbers else defaultOptions.lineNumbers
      readOnly: if @readOnly? then @readOnly else defaultOptions.readOnly
      gutter: if @gutter? then @gutter else defaultOptions.gutter

    _.extend(options, customOptions)

  afterRender: ()->
    @_super("afterRender", @, arguments)
    CodeMirror( @$bodyEl()[0], @codemirrorOptions() )
    @setMaxHeight()
    @setHeight()

  setMaxHeight: (maxHeight=undefined, grow=true)->
    maxHeight ||= @maxHeight
    return unless maxHeight?
    @$('.CodeMirror-scroll').css('max-height', maxHeight)
    @$('.CodeMirror-scroll').css('height', maxHeight) if grow is true

  setHeight: (height=undefined)->
    @$('.CodeMirror-scroll').css('height', height) if height?
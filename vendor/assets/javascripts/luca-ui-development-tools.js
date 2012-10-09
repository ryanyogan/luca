/**
 * CoffeeScript Compiler v1.2.1-pre
 * http://coffeescript.org
 *
 * Copyright 2011, Jeremy Ashkenas
 * Released under the MIT License
 */

(function(root) {
  var CoffeeScript = function() {
      function require(a) {
        return require[a]
      }
      require["./helpers"] = new function() {
        var a = this;
        (function() {
          var b, c;
          a.starts = function(a, b, c) {
            return b === a.substr(c, b.length)
          }, a.ends = function(a, b, c) {
            var d;
            d = b.length;
            return b === a.substr(a.length - d - (c || 0), d)
          }, a.compact = function(a) {
            var b, c, d, e;
            e = [];
            for (c = 0, d = a.length; c < d; c++) b = a[c], b && e.push(b);
            return e
          }, a.count = function(a, b) {
            var c, d;
            c = d = 0;
            if (!b.length) return 1 / 0;
            while (d = 1 + a.indexOf(b, d)) c++;
            return c
          }, a.merge = function(a, c) {
            return b(b({}, a), c)
          }, b = a.extend = function(a, b) {
            var c, d;
            for (c in b) d = b[c], a[c] = d;
            return a
          }, a.flatten = c = function(a) {
            var b, d, e, f;
            d = [];
            for (e = 0, f = a.length; e < f; e++) b = a[e], b instanceof Array ? d = d.concat(c(b)) : d.push(b);
            return d
          }, a.del = function(a, b) {
            var c;
            c = a[b], delete a[b];
            return c
          }, a.last = function(a, b) {
            return a[a.length - (b || 0) - 1]
          }
        }).call(this)
      }, require["./rewriter"] = new function() {
        var a = this;
        (function() {
          var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = [].indexOf ||
          function(a) {
            for (var b = 0, c = this.length; b < c; b++) if (b in this && this[b] === a) return b;
            return -1
          }, u = [].slice;
          a.Rewriter = function() {
            function a() {}
            a.name = "Rewriter", a.prototype.rewrite = function(a) {
              this.tokens = a, this.removeLeadingNewlines(), this.removeMidExpressionNewlines(), this.closeOpenCalls(), this.closeOpenIndexes(), this.addImplicitIndentation(), this.tagPostfixConditionals(), this.addImplicitBraces(), this.addImplicitParentheses();
              return this.tokens
            }, a.prototype.scanTokens = function(a) {
              var b, c, d;
              d = this.tokens, b = 0;
              while (c = d[b]) b += a.call(this, c, b, d);
              return !0
            }, a.prototype.detectEnd = function(a, b, c) {
              var f, g, h, i, j;
              h = this.tokens, f = 0;
              while (g = h[a]) {
                if (f === 0 && b.call(this, g, a)) return c.call(this, g, a);
                if (!g || f < 0) return c.call(this, g, a - 1);
                if (i = g[0], t.call(e, i) >= 0) f += 1;
                else if (j = g[0], t.call(d, j) >= 0) f -= 1;
                a += 1
              }
              return a - 1
            }, a.prototype.removeLeadingNewlines = function() {
              var a, b, c, d, e;
              e = this.tokens;
              for (a = c = 0, d = e.length; c < d; a = ++c) {
                b = e[a][0];
                if (b !== "TERMINATOR") break
              }
              if (a) return this.tokens.splice(0, a)
            }, a.prototype.removeMidExpressionNewlines = function() {
              return this.scanTokens(function(a, b, d) {
                var e;
                if (!(a[0] === "TERMINATOR" && (e = this.tag(b + 1), t.call(c, e) >= 0))) return 1;
                d.splice(b, 1);
                return 0
              })
            }, a.prototype.closeOpenCalls = function() {
              var a, b;
              b = function(a, b) {
                var c;
                return (c = a[0]) === ")" || c === "CALL_END" || a[0] === "OUTDENT" && this.tag(b - 1) === ")"
              }, a = function(a, b) {
                return this.tokens[a[0] === "OUTDENT" ? b - 1 : b][0] = "CALL_END"
              };
              return this.scanTokens(function(c, d) {
                c[0] === "CALL_START" && this.detectEnd(d + 1, b, a);
                return 1
              })
            }, a.prototype.closeOpenIndexes = function() {
              var a, b;
              b = function(a, b) {
                var c;
                return (c = a[0]) === "]" || c === "INDEX_END"
              }, a = function(a, b) {
                return a[0] = "INDEX_END"
              };
              return this.scanTokens(function(c, d) {
                c[0] === "INDEX_START" && this.detectEnd(d + 1, b, a);
                return 1
              })
            }, a.prototype.addImplicitBraces = function() {
              var a, b, c, f, g, i, j;
              f = [], g = null, j = null, c = !0, i = 0, b = function(a, b) {
                var d, e, f, g, i, k;
                i = this.tokens.slice(b + 1, b + 3 + 1 || 9e9), d = i[0], g = i[1], f = i[2];
                if ("HERECOMMENT" === (d != null ? d[0] : void 0)) return !1;
                e = a[0], t.call(l, e) >= 0 && (c = !1);
                return (e === "TERMINATOR" || e === "OUTDENT" || t.call(h, e) >= 0 && c) && (!j && this.tag(b - 1) !== "," || (g != null ? g[0] : void 0) !== ":" && ((d != null ? d[0] : void 0) !== "@" || (f != null ? f[0] : void 0) !== ":")) || e === "," && d && (k = d[0]) !== "IDENTIFIER" && k !== "NUMBER" && k !== "STRING" && k !== "@" && k !== "TERMINATOR" && k !== "OUTDENT"
              }, a = function(a, b) {
                var c;
                c = this.generate("}", "}", a[2]);
                return this.tokens.splice(b, 0, c)
              };
              return this.scanTokens(function(h, i, k) {
                var m, n, o, p, q, r, s, u;
                if (s = p = h[0], t.call(e, s) >= 0) {
                  f.push([p === "INDENT" && this.tag(i - 1) === "{" ? "{" : p, i]);
                  return 1
                }
                if (t.call(d, p) >= 0) {
                  g = f.pop();
                  return 1
                }
                if (p !== ":" || (m = this.tag(i - 2)) !== ":" && ((u = f[f.length - 1]) != null ? u[0] : void 0) === "{") return 1;
                c = !0, f.push(["{"]), n = m === "@" ? i - 2 : i - 1;
                while (this.tag(n - 2) === "HERECOMMENT") n -= 2;
                o = this.tag(n - 1), j = !o || t.call(l, o) >= 0, r = new String("{"), r.generated = !0, q = this.generate("{", r, h[2]), k.splice(n, 0, q), this.detectEnd(i + 2, b, a);
                return 2
              })
            }, a.prototype.addImplicitParentheses = function() {
              var a, b, c, d, e;
              c = e = d = !1, b = function(a, b) {
                var c, g, i, j;
                g = a[0];
                if (!e && a.fromThen) return !0;
                if (g === "IF" || g === "ELSE" || g === "CATCH" || g === "->" || g === "=>" || g === "CLASS") e = !0;
                if (g === "IF" || g === "ELSE" || g === "SWITCH" || g === "TRY" || g === "=") d = !0;
                if ((g === "." || g === "?." || g === "::") && this.tag(b - 1) === "OUTDENT") return !0;
                return !a.generated && this.tag(b - 1) !== "," && (t.call(h, g) >= 0 || g === "INDENT" && !d) && (g !== "INDENT" || (i = this.tag(b - 2)) !== "CLASS" && i !== "EXTENDS" && (j = this.tag(b - 1), t.call(f, j) < 0) && (!(c = this.tokens[b + 1]) || !c.generated || c[0] !== "{"))
              }, a = function(a, b) {
                return this.tokens.splice(b, 0, this.generate("CALL_END", ")", a[2]))
              };
              return this.scanTokens(function(f, h, k) {
                var m, n, o, p, q, r, s, u;
                q = f[0];
                if (q === "CLASS" || q === "IF" || q === "FOR" || q === "WHILE") c = !0;
                r = k.slice(h - 1, h + 1 + 1 || 9e9), p = r[0], n = r[1], o = r[2], m = !c && q === "INDENT" && o && o.generated && o[0] === "{" && p && (s = p[0], t.call(i, s) >= 0), e = !1, d = !1, t.call(l, q) >= 0 && (c = !1), p && !p.spaced && q === "?" && (f.call = !0);
                if (f.fromThen) return 1;
                if (!(m || (p != null ? p.spaced : void 0) && (p.call || (u = p[0], t.call(i, u) >= 0)) && (t.call(g, q) >= 0 || !f.spaced && !f.newLine && t.call(j, q) >= 0))) return 1;
                k.splice(h, 0, this.generate("CALL_START", "(", f[2])), this.detectEnd(h + 1, b, a), p[0] === "?" && (p[0] = "FUNC_EXIST");
                return 2
              })
            }, a.prototype.addImplicitIndentation = function() {
              var a, b, c, d, e;
              e = c = d = null, b = function(a, b) {
                var c;
                return a[1] !== ";" && (c = a[0], t.call(m, c) >= 0) && (a[0] !== "ELSE" || e === "IF" || e === "THEN")
              }, a = function(a, b) {
                return this.tokens.splice(this.tag(b - 1) === "," ? b - 1 : b, 0, d)
              };
              return this.scanTokens(function(f, g, h) {
                var i, j, k;
                i = f[0];
                if (i === "TERMINATOR" && this.tag(g + 1) === "THEN") {
                  h.splice(g, 1);
                  return 0
                }
                if (i === "ELSE" && this.tag(g - 1) !== "OUTDENT") {
                  h.splice.apply(h, [g, 0].concat(u.call(this.indentation(f))));
                  return 2
                }
                if (i === "CATCH" && ((j = this.tag(g + 2)) === "OUTDENT" || j === "TERMINATOR" || j === "FINALLY")) {
                  h.splice.apply(h, [g + 2, 0].concat(u.call(this.indentation(f))));
                  return 4
                }
                if (t.call(n, i) >= 0 && this.tag(g + 1) !== "INDENT" && (i !== "ELSE" || this.tag(g + 1) !== "IF")) {
                  e = i, k = this.indentation(f, !0), c = k[0], d = k[1], e === "THEN" && (c.fromThen = !0), h.splice(g + 1, 0, c), this.detectEnd(g + 2, b, a), i === "THEN" && h.splice(g, 1);
                  return 1
                }
                return 1
              })
            }, a.prototype.tagPostfixConditionals = function() {
              var a, b, c;
              c = null, b = function(a, b) {
                var c;
                return (c = a[0]) === "TERMINATOR" || c === "INDENT"
              }, a = function(a, b) {
                if (a[0] !== "INDENT" || a.generated && !a.fromThen) return c[0] = "POST_" + c[0]
              };
              return this.scanTokens(function(d, e) {
                if (d[0] !== "IF") return 1;
                c = d, this.detectEnd(e + 1, b, a);
                return 1
              })
            }, a.prototype.indentation = function(a, b) {
              var c, d;
              b == null && (b = !1), c = ["INDENT", 2, a[2]], d = ["OUTDENT", 2, a[2]], b && (c.generated = d.generated = !0);
              return [c, d]
            }, a.prototype.generate = function(a, b, c) {
              var d;
              d = [a, b, c], d.generated = !0;
              return d
            }, a.prototype.tag = function(a) {
              var b;
              return (b = this.tokens[a]) != null ? b[0] : void 0
            };
            return a
          }(), b = [
            ["(", ")"],
            ["[", "]"],
            ["{", "}"],
            ["INDENT", "OUTDENT"],
            ["CALL_START", "CALL_END"],
            ["PARAM_START", "PARAM_END"],
            ["INDEX_START", "INDEX_END"]
          ], a.INVERSES = k = {}, e = [], d = [];
          for (q = 0, r = b.length; q < r; q++) s = b[q], o = s[0], p = s[1], e.push(k[p] = o), d.push(k[o] = p);
          c = ["CATCH", "WHEN", "ELSE", "FINALLY"].concat(d), i = ["IDENTIFIER", "SUPER", ")", "CALL_END", "]", "INDEX_END", "@", "THIS"], g = ["IDENTIFIER", "NUMBER", "STRING", "JS", "REGEX", "NEW", "PARAM_START", "CLASS", "IF", "TRY", "SWITCH", "THIS", "BOOL", "UNARY", "SUPER", "@", "->", "=>", "[", "(", "{", "--", "++"], j = ["+", "-"], f = ["->", "=>", "{", "[", ","], h = ["POST_IF", "FOR", "WHILE", "UNTIL", "WHEN", "BY", "LOOP", "TERMINATOR"], n = ["ELSE", "->", "=>", "TRY", "FINALLY", "THEN"], m = ["TERMINATOR", "CATCH", "FINALLY", "ELSE", "OUTDENT", "LEADING_WHEN"], l = ["TERMINATOR", "INDENT", "OUTDENT"]
        }).call(this)
      }, require["./lexer"] = new function() {
        var a = this;
        (function() {
          var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X = [].indexOf ||
          function(a) {
            for (var b = 0, c = this.length; b < c; b++) if (b in this && this[b] === a) return b;
            return -1
          };
          V = require("./rewriter"), J = V.Rewriter, r = V.INVERSES, W = require("./helpers"), R = W.count, U = W.starts, Q = W.compact, T = W.last, a.Lexer = y = function() {
            function a() {}
            a.name = "Lexer", a.prototype.tokenize = function(a, b) {
              var c, d;
              b == null && (b = {}), P.test(a) && (a = "\n" + a), a = a.replace(/\r/g, "").replace(N, ""), this.code = a, this.line = b.line || 0, this.indent = 0, this.indebt = 0, this.outdebt = 0, this.indents = [], this.ends = [], this.tokens = [], c = 0;
              while (this.chunk = a.slice(c)) c += this.identifierToken() || this.commentToken() || this.whitespaceToken() || this.lineToken() || this.heredocToken() || this.stringToken() || this.numberToken() || this.regexToken() || this.jsToken() || this.literalToken();
              this.closeIndentation(), (d = this.ends.pop()) && this.error("missing " + d);
              if (b.rewrite === !1) return this.tokens;
              return (new J).rewrite(this.tokens)
            }, a.prototype.identifierToken = function() {
              var a, b, c, d, h, i, j, k, l;
              if (!(h = p.exec(this.chunk))) return 0;
              d = h[0], c = h[1], a = h[2];
              if (c === "own" && this.tag() === "FOR") {
                this.token("OWN", c);
                return c.length
              }
              b = a || (i = T(this.tokens)) && ((k = i[0]) === "." || k === "?." || k === "::" || !i.spaced && i[0] === "@"), j = "IDENTIFIER", !b && (X.call(u, c) >= 0 || X.call(g, c) >= 0) && (j = c.toUpperCase(), j === "WHEN" && (l = this.tag(), X.call(v, l) >= 0) ? j = "LEADING_WHEN" : j === "FOR" ? this.seenFor = !0 : j === "UNLESS" ? j = "IF" : X.call(O, j) >= 0 ? j = "UNARY" : X.call(H, j) >= 0 && (j !== "INSTANCEOF" && this.seenFor ? (j = "FOR" + j, this.seenFor = !1) : (j = "RELATION", this.value() === "!" && (this.tokens.pop(), c = "!" + c)))), X.call(t, c) >= 0 && (b ? (j = "IDENTIFIER", c = new String(c), c.reserved = !0) : X.call(I, c) >= 0 && this.error('reserved word "' + c + '"')), b || (X.call(e, c) >= 0 && (c = f[c]), j = function() {
                switch (c) {
                case "!":
                  return "UNARY";
                case "==":
                case "!=":
                  return "COMPARE";
                case "&&":
                case "||":
                  return "LOGIC";
                case "true":
                case "false":
                case "null":
                case "undefined":
                  return "BOOL";
                case "break":
                case "continue":
                  return "STATEMENT";
                default:
                  return j
                }
              }()), this.token(j, c), a && this.token(":", ":");
              return d.length
            }, a.prototype.numberToken = function() {
              var a, b, c, d, e;
              if (!(c = E.exec(this.chunk))) return 0;
              d = c[0], /E/.test(d) ? this.error("exponential notation '" + d + "' must be indicated with a lowercase 'e'") : /[BOX]/.test(d) ? this.error("radix prefixes must be lowercase '" + d + "'") : /^0[89]/.test(d) ? this.error("decimal literals '" + d + "' must not be prefixed with '0'") : /^0[0-7]/.test(d) && this.error("octal literals '" + d + "' must be prefixed with '0o'"), b = d.length;
              if (e = /0o([0-7]+)/.exec(d)) d = parseInt(e[1], 8).toString();
              if (a = /0b([01]+)/.exec(d)) d = parseInt(a[1], 2).toString();
              this.token("NUMBER", d);
              return b
            }, a.prototype.stringToken = function() {
              var a, b, c;
              switch (this.chunk.charAt(0)) {
              case "'":
                if (!(a = L.exec(this.chunk))) return 0;
                this.token("STRING", (c = a[0]).replace(A, "\\\n"));
                break;
              case '"':
                if (!(c = this.balancedString(this.chunk, '"'))) return 0;
                0 < c.indexOf("#{", 1) ? this.interpolateString(c.slice(1, -1)) : this.token("STRING", this.escapeLines(c));
                break;
              default:
                return 0
              }(b = /^(?:\\.|[^\\])*\\[0-7]/.test(c)) && this.error("octal escape sequences " + c + " are not allowed"), this.line += R(c, "\n");
              return c.length
            }, a.prototype.heredocToken = function() {
              var a, b, c, d;
              if (!(c = k.exec(this.chunk))) return 0;
              b = c[0], d = b.charAt(0), a = this.sanitizeHeredoc(c[2], {
                quote: d,
                indent: null
              }), d === '"' && 0 <= a.indexOf("#{") ? this.interpolateString(a, {
                heredoc: !0
              }) : this.token("STRING", this.makeString(a, d, !0)), this.line += R(b, "\n");
              return b.length
            }, a.prototype.commentToken = function() {
              var a, b, c;
              if (!(c = this.chunk.match(h))) return 0;
              a = c[0], b = c[1], b && this.token("HERECOMMENT", this.sanitizeHeredoc(b, {
                herecomment: !0,
                indent: Array(this.indent + 1).join(" ")
              })), this.line += R(a, "\n");
              return a.length
            }, a.prototype.jsToken = function() {
              var a, b;
              if (this.chunk.charAt(0) !== "`" || !(a = s.exec(this.chunk))) return 0;
              this.token("JS", (b = a[0]).slice(1, -1));
              return b.length
            }, a.prototype.regexToken = function() {
              var a, b, c, d, e, f, g;
              if (this.chunk.charAt(0) !== "/") return 0;
              if (c = n.exec(this.chunk)) {
                b = this.heregexToken(c), this.line += R(c[0], "\n");
                return b
              }
              d = T(this.tokens);
              if (d && (f = d[0], X.call(d.spaced ? C : D, f) >= 0)) return 0;
              if (!(c = G.exec(this.chunk))) return 0;
              g = c, c = g[0], e = g[1], a = g[2], e.slice(0, 2) === "/*" && this.error("regular expressions cannot begin with `*`"), e === "//" && (e = "/(?:)/"), this.token("REGEX", "" + e + a);
              return c.length
            }, a.prototype.heregexToken = function(a) {
              var b, c, d, e, f, g, h, i, j, k, l, m, n;
              d = a[0], b = a[1], c = a[2];
              if (0 > b.indexOf("#{")) {
                e = b.replace(o, "").replace(/\//g, "\\/"), e.match(/^\*/) && this.error("regular expressions cannot begin with `*`"), this.token("REGEX", "/" + (e || "(?:)") + "/" + c);
                return d.length
              }
              this.token("IDENTIFIER", "RegExp"), this.tokens.push(["CALL_START", "("]), g = [], k = this.interpolateString(b, {
                regex: !0
              });
              for (i = 0, j = k.length; i < j; i++) {
                l = k[i], f = l[0], h = l[1];
                if (f === "TOKENS") g.push.apply(g, h);
                else {
                  if (!(h = h.replace(o, ""))) continue;
                  h = h.replace(/\\/g, "\\\\"), g.push(["STRING", this.makeString(h, '"', !0)])
                }
                g.push(["+", "+"])
              }
              g.pop(), ((m = g[0]) != null ? m[0] : void 0) !== "STRING" && this.tokens.push(["STRING", '""'], ["+", "+"]), (n = this.tokens).push.apply(n, g), c && this.tokens.push([",", ","], ["STRING", '"' + c + '"']), this.token(")", ")");
              return d.length
            }, a.prototype.lineToken = function() {
              var a, b, c, d, e, f;
              if (!(c = B.exec(this.chunk))) return 0;
              b = c[0], this.line += R(b, "\n"), this.seenFor = !1, e = T(this.tokens, 1), f = b.length - 1 - b.lastIndexOf("\n"), d = this.unfinished();
              if (f - this.indebt === this.indent) {
                d ? this.suppressNewlines() : this.newlineToken();
                return b.length
              }
              if (f > this.indent) {
                if (d) {
                  this.indebt = f - this.indent, this.suppressNewlines();
                  return b.length
                }
                a = f - this.indent + this.outdebt, this.token("INDENT", a), this.indents.push(a), this.ends.push("OUTDENT"), this.outdebt = this.indebt = 0
              } else this.indebt = 0, this.outdentToken(this.indent - f, d);
              this.indent = f;
              return b.length
            }, a.prototype.outdentToken = function(a, b) {
              var c, d;
              while (a > 0) d = this.indents.length - 1, this.indents[d] === void 0 ? a = 0 : this.indents[d] === this.outdebt ? (a -= this.outdebt, this.outdebt = 0) : this.indents[d] < this.outdebt ? (this.outdebt -= this.indents[d], a -= this.indents[d]) : (c = this.indents.pop() - this.outdebt, a -= c, this.outdebt = 0, this.pair("OUTDENT"), this.token("OUTDENT", c));
              c && (this.outdebt -= a);
              while (this.value() === ";") this.tokens.pop();
              this.tag() !== "TERMINATOR" && !b && this.token("TERMINATOR", "\n");
              return this
            }, a.prototype.whitespaceToken = function() {
              var a, b, c;
              if (!(a = P.exec(this.chunk)) && !(b = this.chunk.charAt(0) === "\n")) return 0;
              c = T(this.tokens), c && (c[a ? "spaced" : "newLine"] = !0);
              return a ? a[0].length : 0
            }, a.prototype.newlineToken = function() {
              while (this.value() === ";") this.tokens.pop();
              this.tag() !== "TERMINATOR" && this.token("TERMINATOR", "\n");
              return this
            }, a.prototype.suppressNewlines = function() {
              this.value() === "\\" && this.tokens.pop();
              return this
            }, a.prototype.literalToken = function() {
              var a, b, e, f, g, h, k, l;
              (a = F.exec(this.chunk)) ? (f = a[0], d.test(f) && this.tagParameters()) : f = this.chunk.charAt(0), e = f, b = T(this.tokens);
              if (f === "=" && b) {
                !b[1].reserved && (g = b[1], X.call(t, g) >= 0) && this.error('reserved word "' + this.value() + "\" can't be assigned");
                if ((h = b[1]) === "||" || h === "&&") {
                  b[0] = "COMPOUND_ASSIGN", b[1] += "=";
                  return f.length
                }
              }
              if (f === ";") this.seenFor = !1, e = "TERMINATOR";
              else if (X.call(z, f) >= 0) e = "MATH";
              else if (X.call(i, f) >= 0) e = "COMPARE";
              else if (X.call(j, f) >= 0) e = "COMPOUND_ASSIGN";
              else if (X.call(O, f) >= 0) e = "UNARY";
              else if (X.call(K, f) >= 0) e = "SHIFT";
              else if (X.call(x, f) >= 0 || f === "?" && (b != null ? b.spaced : void 0)) e = "LOGIC";
              else if (b && !b.spaced) if (f === "(" && (k = b[0], X.call(c, k) >= 0)) b[0] === "?" && (b[0] = "FUNC_EXIST"), e = "CALL_START";
              else if (f === "[" && (l = b[0], X.call(q, l) >= 0)) {
                e = "INDEX_START";
                switch (b[0]) {
                case "?":
                  b[0] = "INDEX_SOAK"
                }
              }
              switch (f) {
              case "(":
              case "{":
              case "[":
                this.ends.push(r[f]);
                break;
              case ")":
              case "}":
              case "]":
                this.pair(f)
              }
              this.token(e, f);
              return f.length
            }, a.prototype.sanitizeHeredoc = function(a, b) {
              var c, d, e, f, g;
              e = b.indent, d = b.herecomment;
              if (d) {
                l.test(a) && this.error('block comment cannot contain "*/", starting');
                if (a.indexOf("\n") <= 0) return a
              } else while (f = m.exec(a)) {
                c = f[1];
                if (e === null || 0 < (g = c.length) && g < e.length) e = c
              }
              e && (a = a.replace(RegExp("\\n" + e, "g"), "\n")), d || (a = a.replace(/^\n/, ""));
              return a
            }, a.prototype.tagParameters = function() {
              var a, b, c, d;
              if (this.tag() !== ")") return this;
              b = [], d = this.tokens, a = d.length, d[--a][0] = "PARAM_END";
              while (c = d[--a]) switch (c[0]) {
              case ")":
                b.push(c);
                break;
              case "(":
              case "CALL_START":
                if (b.length) b.pop();
                else {
                  if (c[0] === "(") {
                    c[0] = "PARAM_START";
                    return this
                  }
                  return this
                }
              }
              return this
            }, a.prototype.closeIndentation = function() {
              return this.outdentToken(this.indent)
            }, a.prototype.balancedString = function(a, b) {
              var c, d, e, f, g, h, i, j;
              c = 0, h = [b];
              for (d = i = 1, j = a.length; 1 <= j ? i < j : i > j; d = 1 <= j ? ++i : --i) {
                if (c) {
                  --c;
                  continue
                }
                switch (e = a.charAt(d)) {
                case "\\":
                  ++c;
                  continue;
                case b:
                  h.pop();
                  if (!h.length) return a.slice(0, d + 1 || 9e9);
                  b = h[h.length - 1];
                  continue
                }
                b !== "}" || e !== '"' && e !== "'" ? b === "}" && e === "/" && (f = n.exec(a.slice(d)) || G.exec(a.slice(d))) ? c += f[0].length - 1 : b === "}" && e === "{" ? h.push(b = "}") : b === '"' && g === "#" && e === "{" && h.push(b = "}") : h.push(b = e), g = e
              }
              return this.error("missing " + h.pop() + ", starting")
            }, a.prototype.interpolateString = function(b, c) {
              var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u;
              c == null && (c = {}), e = c.heredoc, m = c.regex, o = [], l = 0, f = -1;
              while (j = b.charAt(f += 1)) {
                if (j === "\\") {
                  f += 1;
                  continue
                }
                if (j !== "#" || b.charAt(f + 1) !== "{" || !(d = this.balancedString(b.slice(f + 1), "}"))) continue;
                l < f && o.push(["NEOSTRING", b.slice(l, f)]), g = d.slice(1, -1);
                if (g.length) {
                  k = (new a).tokenize(g, {
                    line: this.line,
                    rewrite: !1
                  }), k.pop(), ((s = k[0]) != null ? s[0] : void 0) === "TERMINATOR" && k.shift();
                  if (i = k.length) i > 1 && (k.unshift(["(", "(", this.line]), k.push([")", ")", this.line])), o.push(["TOKENS", k])
                }
                f += d.length, l = f + 1
              }
              f > l && l < b.length && o.push(["NEOSTRING", b.slice(l)]);
              if (m) return o;
              if (!o.length) return this.token("STRING", '""');
              o[0][0] !== "NEOSTRING" && o.unshift(["", ""]), (h = o.length > 1) && this.token("(", "(");
              for (f = q = 0, r = o.length; q < r; f = ++q) t = o[f], n = t[0], p = t[1], f && this.token("+", "+"), n === "TOKENS" ? (u = this.tokens).push.apply(u, p) : this.token("STRING", this.makeString(p, '"', e));
              h && this.token(")", ")");
              return o
            }, a.prototype.pair = function(a) {
              var b, c;
              if (a !== (c = T(this.ends))) {
                "OUTDENT" !== c && this.error("unmatched " + a), this.indent -= b = T(this.indents), this.outdentToken(b, !0);
                return this.pair(a)
              }
              return this.ends.pop()
            }, a.prototype.token = function(a, b) {
              return this.tokens.push([a, b, this.line])
            }, a.prototype.tag = function(a, b) {
              var c;
              return (c = T(this.tokens, a)) && (b ? c[0] = b : c[0])
            }, a.prototype.value = function(a, b) {
              var c;
              return (c = T(this.tokens, a)) && (b ? c[1] = b : c[1])
            }, a.prototype.unfinished = function() {
              var a;
              return w.test(this.chunk) || (a = this.tag()) === "\\" || a === "." || a === "?." || a === "UNARY" || a === "MATH" || a === "+" || a === "-" || a === "SHIFT" || a === "RELATION" || a === "COMPARE" || a === "LOGIC" || a === "THROW" || a === "EXTENDS"
            }, a.prototype.escapeLines = function(a, b) {
              return a.replace(A, b ? "\\n" : "")
            }, a.prototype.makeString = function(a, b, c) {
              if (!a) return b + b;
              a = a.replace(/\\([\s\S])/g, function(a, c) {
                return c === "\n" || c === b ? c : a
              }), a = a.replace(RegExp("" + b, "g"), "\\$&");
              return b + this.escapeLines(a, c) + b
            }, a.prototype.error = function(a) {
              throw SyntaxError("" + a + " on line " + (this.line + 1))
            };
            return a
          }(), u = ["true", "false", "null", "this", "new", "delete", "typeof", "in", "instanceof", "return", "throw", "break", "continue", "debugger", "if", "else", "switch", "for", "while", "do", "try", "catch", "finally", "class", "extends", "super"], g = ["undefined", "then", "unless", "until", "loop", "of", "by", "when"], f = {
            and: "&&",
            or: "||",
            is: "==",
            isnt: "!=",
            not: "!",
            yes: "true",
            no: "false",
            on: "true",
            off: "false"
          }, e = function() {
            var a;
            a = [];
            for (S in f) a.push(S);
            return a
          }(), g = g.concat(e), I = ["case", "default", "function", "var", "void", "with", "const", "let", "enum", "export", "import", "native", "__hasProp", "__extends", "__slice", "__bind", "__indexOf", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"], M = ["arguments", "eval"], t = u.concat(I).concat(M), a.RESERVED = I.concat(u).concat(g).concat(M), a.STRICT_PROSCRIBED = M, p = /^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?/, E = /^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i, k = /^("""|''')([\s\S]*?)(?:\n[^\n\S]*)?\1/, F = /^(?:[-=]>|[-+*\/%<>&|^!?=]=|>>>=?|([-+:])\1|([&|<>])\2=?|\?\.|\.{2,3})/, P = /^[^\n\S]+/, h = /^###([^#][\s\S]*?)(?:###[^\n\S]*|(?:###)?$)|^(?:\s*#(?!##[^#]).*)+/, d = /^[-=]>/, B = /^(?:\n[^\n\S]*)+/, L = /^'[^\\']*(?:\\.[^\\']*)*'/, s = /^`[^\\`]*(?:\\.[^\\`]*)*`/, G = /^(\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)([imgy]{0,4})(?!\w)/, n = /^\/{3}([\s\S]+?)\/{3}([imgy]{0,4})(?!\w)/, o = /\s+(?:#.*)?/g, A = /\n/g, m = /\n+([^\n\S]*)/g, l = /\*\//, w = /^\s*(?:,|\??\.(?![.\d])|::)/, N = /\s+$/, j = ["-=", "+=", "/=", "*=", "%=", "||=", "&&=", "?=", "<<=", ">>=", ">>>=", "&=", "^=", "|="], O = ["!", "~", "NEW", "TYPEOF", "DELETE", "DO"], x = ["&&", "||", "&", "|", "^"], K = ["<<", ">>", ">>>"], i = ["==", "!=", "<", ">", "<=", ">="], z = ["*", "/", "%"], H = ["IN", "OF", "INSTANCEOF"], b = ["TRUE", "FALSE", "NULL", "UNDEFINED"], C = ["NUMBER", "REGEX", "BOOL", "++", "--", "]"], D = C.concat(")", "}", "THIS", "IDENTIFIER", "STRING"), c = ["IDENTIFIER", "STRING", "REGEX", ")", "]", "}", "?", "::", "@", "THIS", "SUPER"], q = c.concat("NUMBER", "BOOL"), v = ["INDENT", "OUTDENT", "TERMINATOR"]
        }).call(this)
      }, require["./parser"] = new function() {
        var a = this,
          b = function() {
            undefined;
            var a = {
              trace: function() {},
              yy: {},
              symbols_: {
                error: 2,
                Root: 3,
                Body: 4,
                Block: 5,
                TERMINATOR: 6,
                Line: 7,
                Expression: 8,
                Statement: 9,
                Return: 10,
                Comment: 11,
                STATEMENT: 12,
                Value: 13,
                Invocation: 14,
                Code: 15,
                Operation: 16,
                Assign: 17,
                If: 18,
                Try: 19,
                While: 20,
                For: 21,
                Switch: 22,
                Class: 23,
                Throw: 24,
                INDENT: 25,
                OUTDENT: 26,
                Identifier: 27,
                IDENTIFIER: 28,
                AlphaNumeric: 29,
                NUMBER: 30,
                STRING: 31,
                Literal: 32,
                JS: 33,
                REGEX: 34,
                DEBUGGER: 35,
                BOOL: 36,
                Assignable: 37,
                "=": 38,
                AssignObj: 39,
                ObjAssignable: 40,
                ":": 41,
                ThisProperty: 42,
                RETURN: 43,
                HERECOMMENT: 44,
                PARAM_START: 45,
                ParamList: 46,
                PARAM_END: 47,
                FuncGlyph: 48,
                "->": 49,
                "=>": 50,
                OptComma: 51,
                ",": 52,
                Param: 53,
                ParamVar: 54,
                "...": 55,
                Array: 56,
                Object: 57,
                Splat: 58,
                SimpleAssignable: 59,
                Accessor: 60,
                Parenthetical: 61,
                Range: 62,
                This: 63,
                ".": 64,
                "?.": 65,
                "::": 66,
                Index: 67,
                INDEX_START: 68,
                IndexValue: 69,
                INDEX_END: 70,
                INDEX_SOAK: 71,
                Slice: 72,
                "{": 73,
                AssignList: 74,
                "}": 75,
                CLASS: 76,
                EXTENDS: 77,
                OptFuncExist: 78,
                Arguments: 79,
                SUPER: 80,
                FUNC_EXIST: 81,
                CALL_START: 82,
                CALL_END: 83,
                ArgList: 84,
                THIS: 85,
                "@": 86,
                "[": 87,
                "]": 88,
                RangeDots: 89,
                "..": 90,
                Arg: 91,
                SimpleArgs: 92,
                TRY: 93,
                Catch: 94,
                FINALLY: 95,
                CATCH: 96,
                THROW: 97,
                "(": 98,
                ")": 99,
                WhileSource: 100,
                WHILE: 101,
                WHEN: 102,
                UNTIL: 103,
                Loop: 104,
                LOOP: 105,
                ForBody: 106,
                FOR: 107,
                ForStart: 108,
                ForSource: 109,
                ForVariables: 110,
                OWN: 111,
                ForValue: 112,
                FORIN: 113,
                FOROF: 114,
                BY: 115,
                SWITCH: 116,
                Whens: 117,
                ELSE: 118,
                When: 119,
                LEADING_WHEN: 120,
                IfBlock: 121,
                IF: 122,
                POST_IF: 123,
                UNARY: 124,
                "-": 125,
                "+": 126,
                "--": 127,
                "++": 128,
                "?": 129,
                MATH: 130,
                SHIFT: 131,
                COMPARE: 132,
                LOGIC: 133,
                RELATION: 134,
                COMPOUND_ASSIGN: 135,
                $accept: 0,
                $end: 1
              },
              terminals_: {
                2: "error",
                6: "TERMINATOR",
                12: "STATEMENT",
                25: "INDENT",
                26: "OUTDENT",
                28: "IDENTIFIER",
                30: "NUMBER",
                31: "STRING",
                33: "JS",
                34: "REGEX",
                35: "DEBUGGER",
                36: "BOOL",
                38: "=",
                41: ":",
                43: "RETURN",
                44: "HERECOMMENT",
                45: "PARAM_START",
                47: "PARAM_END",
                49: "->",
                50: "=>",
                52: ",",
                55: "...",
                64: ".",
                65: "?.",
                66: "::",
                68: "INDEX_START",
                70: "INDEX_END",
                71: "INDEX_SOAK",
                73: "{",
                75: "}",
                76: "CLASS",
                77: "EXTENDS",
                80: "SUPER",
                81: "FUNC_EXIST",
                82: "CALL_START",
                83: "CALL_END",
                85: "THIS",
                86: "@",
                87: "[",
                88: "]",
                90: "..",
                93: "TRY",
                95: "FINALLY",
                96: "CATCH",
                97: "THROW",
                98: "(",
                99: ")",
                101: "WHILE",
                102: "WHEN",
                103: "UNTIL",
                105: "LOOP",
                107: "FOR",
                111: "OWN",
                113: "FORIN",
                114: "FOROF",
                115: "BY",
                116: "SWITCH",
                118: "ELSE",
                120: "LEADING_WHEN",
                122: "IF",
                123: "POST_IF",
                124: "UNARY",
                125: "-",
                126: "+",
                127: "--",
                128: "++",
                129: "?",
                130: "MATH",
                131: "SHIFT",
                132: "COMPARE",
                133: "LOGIC",
                134: "RELATION",
                135: "COMPOUND_ASSIGN"
              },
              productions_: [0, [3, 0],
                [3, 1],
                [3, 2],
                [4, 1],
                [4, 3],
                [4, 2],
                [7, 1],
                [7, 1],
                [9, 1],
                [9, 1],
                [9, 1],
                [8, 1],
                [8, 1],
                [8, 1],
                [8, 1],
                [8, 1],
                [8, 1],
                [8, 1],
                [8, 1],
                [8, 1],
                [8, 1],
                [8, 1],
                [8, 1],
                [5, 2],
                [5, 3],
                [27, 1],
                [29, 1],
                [29, 1],
                [32, 1],
                [32, 1],
                [32, 1],
                [32, 1],
                [32, 1],
                [17, 3],
                [17, 4],
                [17, 5],
                [39, 1],
                [39, 3],
                [39, 5],
                [39, 1],
                [40, 1],
                [40, 1],
                [40, 1],
                [10, 2],
                [10, 1],
                [11, 1],
                [15, 5],
                [15, 2],
                [48, 1],
                [48, 1],
                [51, 0],
                [51, 1],
                [46, 0],
                [46, 1],
                [46, 3],
                [53, 1],
                [53, 2],
                [53, 3],
                [54, 1],
                [54, 1],
                [54, 1],
                [54, 1],
                [58, 2],
                [59, 1],
                [59, 2],
                [59, 2],
                [59, 1],
                [37, 1],
                [37, 1],
                [37, 1],
                [13, 1],
                [13, 1],
                [13, 1],
                [13, 1],
                [13, 1],
                [60, 2],
                [60, 2],
                [60, 2],
                [60, 1],
                [60, 1],
                [67, 3],
                [67, 2],
                [69, 1],
                [69, 1],
                [57, 4],
                [74, 0],
                [74, 1],
                [74, 3],
                [74, 4],
                [74, 6],
                [23, 1],
                [23, 2],
                [23, 3],
                [23, 4],
                [23, 2],
                [23, 3],
                [23, 4],
                [23, 5],
                [14, 3],
                [14, 3],
                [14, 1],
                [14, 2],
                [78, 0],
                [78, 1],
                [79, 2],
                [79, 4],
                [63, 1],
                [63, 1],
                [42, 2],
                [56, 2],
                [56, 4],
                [89, 1],
                [89, 1],
                [62, 5],
                [72, 3],
                [72, 2],
                [72, 2],
                [72, 1],
                [84, 1],
                [84, 3],
                [84, 4],
                [84, 4],
                [84, 6],
                [91, 1],
                [91, 1],
                [92, 1],
                [92, 3],
                [19, 2],
                [19, 3],
                [19, 4],
                [19, 5],
                [94, 3],
                [24, 2],
                [61, 3],
                [61, 5],
                [100, 2],
                [100, 4],
                [100, 2],
                [100, 4],
                [20, 2],
                [20, 2],
                [20, 2],
                [20, 1],
                [104, 2],
                [104, 2],
                [21, 2],
                [21, 2],
                [21, 2],
                [106, 2],
                [106, 2],
                [108, 2],
                [108, 3],
                [112, 1],
                [112, 1],
                [112, 1],
                [110, 1],
                [110, 3],
                [109, 2],
                [109, 2],
                [109, 4],
                [109, 4],
                [109, 4],
                [109, 6],
                [109, 6],
                [22, 5],
                [22, 7],
                [22, 4],
                [22, 6],
                [117, 1],
                [117, 2],
                [119, 3],
                [119, 4],
                [121, 3],
                [121, 5],
                [18, 1],
                [18, 3],
                [18, 3],
                [18, 3],
                [16, 2],
                [16, 2],
                [16, 2],
                [16, 2],
                [16, 2],
                [16, 2],
                [16, 2],
                [16, 2],
                [16, 3],
                [16, 3],
                [16, 3],
                [16, 3],
                [16, 3],
                [16, 3],
                [16, 3],
                [16, 3],
                [16, 5],
                [16, 3]
              ],
              performAction: function(b, c, d, e, f, g, h) {
                var i = g.length - 1;
                switch (f) {
                case 1:
                  return this.$ = new e.Block;
                case 2:
                  return this.$ = g[i];
                case 3:
                  return this.$ = g[i - 1];
                case 4:
                  this.$ = e.Block.wrap([g[i]]);
                  break;
                case 5:
                  this.$ = g[i - 2].push(g[i]);
                  break;
                case 6:
                  this.$ = g[i - 1];
                  break;
                case 7:
                  this.$ = g[i];
                  break;
                case 8:
                  this.$ = g[i];
                  break;
                case 9:
                  this.$ = g[i];
                  break;
                case 10:
                  this.$ = g[i];
                  break;
                case 11:
                  this.$ = new e.Literal(g[i]);
                  break;
                case 12:
                  this.$ = g[i];
                  break;
                case 13:
                  this.$ = g[i];
                  break;
                case 14:
                  this.$ = g[i];
                  break;
                case 15:
                  this.$ = g[i];
                  break;
                case 16:
                  this.$ = g[i];
                  break;
                case 17:
                  this.$ = g[i];
                  break;
                case 18:
                  this.$ = g[i];
                  break;
                case 19:
                  this.$ = g[i];
                  break;
                case 20:
                  this.$ = g[i];
                  break;
                case 21:
                  this.$ = g[i];
                  break;
                case 22:
                  this.$ = g[i];
                  break;
                case 23:
                  this.$ = g[i];
                  break;
                case 24:
                  this.$ = new e.Block;
                  break;
                case 25:
                  this.$ = g[i - 1];
                  break;
                case 26:
                  this.$ = new e.Literal(g[i]);
                  break;
                case 27:
                  this.$ = new e.Literal(g[i]);
                  break;
                case 28:
                  this.$ = new e.Literal(g[i]);
                  break;
                case 29:
                  this.$ = g[i];
                  break;
                case 30:
                  this.$ = new e.Literal(g[i]);
                  break;
                case 31:
                  this.$ = new e.Literal(g[i]);
                  break;
                case 32:
                  this.$ = new e.Literal(g[i]);
                  break;
                case 33:
                  this.$ = function() {
                    var a;
                    a = new e.Literal(g[i]), g[i] === "undefined" && (a.isUndefined = !0);
                    return a
                  }();
                  break;
                case 34:
                  this.$ = new e.Assign(g[i - 2], g[i]);
                  break;
                case 35:
                  this.$ = new e.Assign(g[i - 3], g[i]);
                  break;
                case 36:
                  this.$ = new e.Assign(g[i - 4], g[i - 1]);
                  break;
                case 37:
                  this.$ = new e.Value(g[i]);
                  break;
                case 38:
                  this.$ = new e.Assign(new e.Value(g[i - 2]), g[i], "object");
                  break;
                case 39:
                  this.$ = new e.Assign(new e.Value(g[i - 4]), g[i - 1], "object");
                  break;
                case 40:
                  this.$ = g[i];
                  break;
                case 41:
                  this.$ = g[i];
                  break;
                case 42:
                  this.$ = g[i];
                  break;
                case 43:
                  this.$ = g[i];
                  break;
                case 44:
                  this.$ = new e.Return(g[i]);
                  break;
                case 45:
                  this.$ = new e.Return;
                  break;
                case 46:
                  this.$ = new e.Comment(g[i]);
                  break;
                case 47:
                  this.$ = new e.Code(g[i - 3], g[i], g[i - 1]);
                  break;
                case 48:
                  this.$ = new e.Code([], g[i], g[i - 1]);
                  break;
                case 49:
                  this.$ = "func";
                  break;
                case 50:
                  this.$ = "boundfunc";
                  break;
                case 51:
                  this.$ = g[i];
                  break;
                case 52:
                  this.$ = g[i];
                  break;
                case 53:
                  this.$ = [];
                  break;
                case 54:
                  this.$ = [g[i]];
                  break;
                case 55:
                  this.$ = g[i - 2].concat(g[i]);
                  break;
                case 56:
                  this.$ = new e.Param(g[i]);
                  break;
                case 57:
                  this.$ = new e.Param(g[i - 1], null, !0);
                  break;
                case 58:
                  this.$ = new e.Param(g[i - 2], g[i]);
                  break;
                case 59:
                  this.$ = g[i];
                  break;
                case 60:
                  this.$ = g[i];
                  break;
                case 61:
                  this.$ = g[i];
                  break;
                case 62:
                  this.$ = g[i];
                  break;
                case 63:
                  this.$ = new e.Splat(g[i - 1]);
                  break;
                case 64:
                  this.$ = new e.Value(g[i]);
                  break;
                case 65:
                  this.$ = g[i - 1].add(g[i]);
                  break;
                case 66:
                  this.$ = new e.Value(g[i - 1], [].concat(g[i]));
                  break;
                case 67:
                  this.$ = g[i];
                  break;
                case 68:
                  this.$ = g[i];
                  break;
                case 69:
                  this.$ = new e.Value(g[i]);
                  break;
                case 70:
                  this.$ = new e.Value(g[i]);
                  break;
                case 71:
                  this.$ = g[i];
                  break;
                case 72:
                  this.$ = new e.Value(g[i]);
                  break;
                case 73:
                  this.$ = new e.Value(g[i]);
                  break;
                case 74:
                  this.$ = new e.Value(g[i]);
                  break;
                case 75:
                  this.$ = g[i];
                  break;
                case 76:
                  this.$ = new e.Access(g[i]);
                  break;
                case 77:
                  this.$ = new e.Access(g[i], "soak");
                  break;
                case 78:
                  this.$ = [new e.Access(new e.Literal("prototype")), new e.Access(g[i])];
                  break;
                case 79:
                  this.$ = new e.Access(new e.Literal("prototype"));
                  break;
                case 80:
                  this.$ = g[i];
                  break;
                case 81:
                  this.$ = g[i - 1];
                  break;
                case 82:
                  this.$ = e.extend(g[i], {
                    soak: !0
                  });
                  break;
                case 83:
                  this.$ = new e.Index(g[i]);
                  break;
                case 84:
                  this.$ = new e.Slice(g[i]);
                  break;
                case 85:
                  this.$ = new e.Obj(g[i - 2], g[i - 3].generated);
                  break;
                case 86:
                  this.$ = [];
                  break;
                case 87:
                  this.$ = [g[i]];
                  break;
                case 88:
                  this.$ = g[i - 2].concat(g[i]);
                  break;
                case 89:
                  this.$ = g[i - 3].concat(g[i]);
                  break;
                case 90:
                  this.$ = g[i - 5].concat(g[i - 2]);
                  break;
                case 91:
                  this.$ = new e.Class;
                  break;
                case 92:
                  this.$ = new e.Class(null, null, g[i]);
                  break;
                case 93:
                  this.$ = new e.Class(null, g[i]);
                  break;
                case 94:
                  this.$ = new e.Class(null, g[i - 1], g[i]);
                  break;
                case 95:
                  this.$ = new e.Class(g[i]);
                  break;
                case 96:
                  this.$ = new e.Class(g[i - 1], null, g[i]);
                  break;
                case 97:
                  this.$ = new e.Class(g[i - 2], g[i]);
                  break;
                case 98:
                  this.$ = new e.Class(g[i - 3], g[i - 1], g[i]);
                  break;
                case 99:
                  this.$ = new e.Call(g[i - 2], g[i], g[i - 1]);
                  break;
                case 100:
                  this.$ = new e.Call(g[i - 2], g[i], g[i - 1]);
                  break;
                case 101:
                  this.$ = new e.Call("super", [new e.Splat(new e.Literal("arguments"))]);
                  break;
                case 102:
                  this.$ = new e.Call("super", g[i]);
                  break;
                case 103:
                  this.$ = !1;
                  break;
                case 104:
                  this.$ = !0;
                  break;
                case 105:
                  this.$ = [];
                  break;
                case 106:
                  this.$ = g[i - 2];
                  break;
                case 107:
                  this.$ = new e.Value(new e.Literal("this"));
                  break;
                case 108:
                  this.$ = new e.Value(new e.Literal("this"));
                  break;
                case 109:
                  this.$ = new e.Value(new e.Literal("this"), [new e.Access(g[i])], "this");
                  break;
                case 110:
                  this.$ = new e.Arr([]);
                  break;
                case 111:
                  this.$ = new e.Arr(g[i - 2]);
                  break;
                case 112:
                  this.$ = "inclusive";
                  break;
                case 113:
                  this.$ = "exclusive";
                  break;
                case 114:
                  this.$ = new e.Range(g[i - 3], g[i - 1], g[i - 2]);
                  break;
                case 115:
                  this.$ = new e.Range(g[i - 2], g[i], g[i - 1]);
                  break;
                case 116:
                  this.$ = new e.Range(g[i - 1], null, g[i]);
                  break;
                case 117:
                  this.$ = new e.Range(null, g[i], g[i - 1]);
                  break;
                case 118:
                  this.$ = new e.Range(null, null, g[i]);
                  break;
                case 119:
                  this.$ = [g[i]];
                  break;
                case 120:
                  this.$ = g[i - 2].concat(g[i]);
                  break;
                case 121:
                  this.$ = g[i - 3].concat(g[i]);
                  break;
                case 122:
                  this.$ = g[i - 2];
                  break;
                case 123:
                  this.$ = g[i - 5].concat(g[i - 2]);
                  break;
                case 124:
                  this.$ = g[i];
                  break;
                case 125:
                  this.$ = g[i];
                  break;
                case 126:
                  this.$ = g[i];
                  break;
                case 127:
                  this.$ = [].concat(g[i - 2], g[i]);
                  break;
                case 128:
                  this.$ = new e.Try(g[i]);
                  break;
                case 129:
                  this.$ = new e.Try(g[i - 1], g[i][0], g[i][1]);
                  break;
                case 130:
                  this.$ = new e.Try(g[i - 2], null, null, g[i]);
                  break;
                case 131:
                  this.$ = new e.Try(g[i - 3], g[i - 2][0], g[i - 2][1], g[i]);
                  break;
                case 132:
                  this.$ = [g[i - 1], g[i]];
                  break;
                case 133:
                  this.$ = new e.Throw(g[i]);
                  break;
                case 134:
                  this.$ = new e.Parens(g[i - 1]);
                  break;
                case 135:
                  this.$ = new e.Parens(g[i - 2]);
                  break;
                case 136:
                  this.$ = new e.While(g[i]);
                  break;
                case 137:
                  this.$ = new e.While(g[i - 2], {
                    guard: g[i]
                  });
                  break;
                case 138:
                  this.$ = new e.While(g[i], {
                    invert: !0
                  });
                  break;
                case 139:
                  this.$ = new e.While(g[i - 2], {
                    invert: !0,
                    guard: g[i]
                  });
                  break;
                case 140:
                  this.$ = g[i - 1].addBody(g[i]);
                  break;
                case 141:
                  this.$ = g[i].addBody(e.Block.wrap([g[i - 1]]));
                  break;
                case 142:
                  this.$ = g[i].addBody(e.Block.wrap([g[i - 1]]));
                  break;
                case 143:
                  this.$ = g[i];
                  break;
                case 144:
                  this.$ = (new e.While(new e.Literal("true"))).addBody(g[i]);
                  break;
                case 145:
                  this.$ = (new e.While(new e.Literal("true"))).addBody(e.Block.wrap([g[i]]));
                  break;
                case 146:
                  this.$ = new e.For(g[i - 1], g[i]);
                  break;
                case 147:
                  this.$ = new e.For(g[i - 1], g[i]);
                  break;
                case 148:
                  this.$ = new e.For(g[i], g[i - 1]);
                  break;
                case 149:
                  this.$ = {
                    source: new e.Value(g[i])
                  };
                  break;
                case 150:
                  this.$ = function() {
                    g[i].own = g[i - 1].own, g[i].name = g[i - 1][0], g[i].index = g[i - 1][1];
                    return g[i]
                  }();
                  break;
                case 151:
                  this.$ = g[i];
                  break;
                case 152:
                  this.$ = function() {
                    g[i].own = !0;
                    return g[i]
                  }();
                  break;
                case 153:
                  this.$ = g[i];
                  break;
                case 154:
                  this.$ = new e.Value(g[i]);
                  break;
                case 155:
                  this.$ = new e.Value(g[i]);
                  break;
                case 156:
                  this.$ = [g[i]];
                  break;
                case 157:
                  this.$ = [g[i - 2], g[i]];
                  break;
                case 158:
                  this.$ = {
                    source: g[i]
                  };
                  break;
                case 159:
                  this.$ = {
                    source: g[i],
                    object: !0
                  };
                  break;
                case 160:
                  this.$ = {
                    source: g[i - 2],
                    guard: g[i]
                  };
                  break;
                case 161:
                  this.$ = {
                    source: g[i - 2],
                    guard: g[i],
                    object: !0
                  };
                  break;
                case 162:
                  this.$ = {
                    source: g[i - 2],
                    step: g[i]
                  };
                  break;
                case 163:
                  this.$ = {
                    source: g[i - 4],
                    guard: g[i - 2],
                    step: g[i]
                  };
                  break;
                case 164:
                  this.$ = {
                    source: g[i - 4],
                    step: g[i - 2],
                    guard: g[i]
                  };
                  break;
                case 165:
                  this.$ = new e.Switch(g[i - 3], g[i - 1]);
                  break;
                case 166:
                  this.$ = new e.Switch(g[i - 5], g[i - 3], g[i - 1]);
                  break;
                case 167:
                  this.$ = new e.Switch(null, g[i - 1]);
                  break;
                case 168:
                  this.$ = new e.Switch(null, g[i - 3], g[i - 1]);
                  break;
                case 169:
                  this.$ = g[i];
                  break;
                case 170:
                  this.$ = g[i - 1].concat(g[i]);
                  break;
                case 171:
                  this.$ = [
                    [g[i - 1], g[i]]
                  ];
                  break;
                case 172:
                  this.$ = [
                    [g[i - 2], g[i - 1]]
                  ];
                  break;
                case 173:
                  this.$ = new e.If(g[i - 1], g[i], {
                    type: g[i - 2]
                  });
                  break;
                case 174:
                  this.$ = g[i - 4].addElse(new e.If(g[i - 1], g[i], {
                    type: g[i - 2]
                  }));
                  break;
                case 175:
                  this.$ = g[i];
                  break;
                case 176:
                  this.$ = g[i - 2].addElse(g[i]);
                  break;
                case 177:
                  this.$ = new e.If(g[i], e.Block.wrap([g[i - 2]]), {
                    type: g[i - 1],
                    statement: !0
                  });
                  break;
                case 178:
                  this.$ = new e.If(g[i], e.Block.wrap([g[i - 2]]), {
                    type: g[i - 1],
                    statement: !0
                  });
                  break;
                case 179:
                  this.$ = new e.Op(g[i - 1], g[i]);
                  break;
                case 180:
                  this.$ = new e.Op("-", g[i]);
                  break;
                case 181:
                  this.$ = new e.Op("+", g[i]);
                  break;
                case 182:
                  this.$ = new e.Op("--", g[i]);
                  break;
                case 183:
                  this.$ = new e.Op("++", g[i]);
                  break;
                case 184:
                  this.$ = new e.Op("--", g[i - 1], null, !0);
                  break;
                case 185:
                  this.$ = new e.Op("++", g[i - 1], null, !0);
                  break;
                case 186:
                  this.$ = new e.Existence(g[i - 1]);
                  break;
                case 187:
                  this.$ = new e.Op("+", g[i - 2], g[i]);
                  break;
                case 188:
                  this.$ = new e.Op("-", g[i - 2], g[i]);
                  break;
                case 189:
                  this.$ = new e.Op(g[i - 1], g[i - 2], g[i]);
                  break;
                case 190:
                  this.$ = new e.Op(g[i - 1], g[i - 2], g[i]);
                  break;
                case 191:
                  this.$ = new e.Op(g[i - 1], g[i - 2], g[i]);
                  break;
                case 192:
                  this.$ = new e.Op(g[i - 1], g[i - 2], g[i]);
                  break;
                case 193:
                  this.$ = function() {
                    return g[i - 1].charAt(0) === "!" ? (new e.Op(g[i - 1].slice(1), g[i - 2], g[i])).invert() : new e.Op(g[i - 1], g[i - 2], g[i])
                  }();
                  break;
                case 194:
                  this.$ = new e.Assign(g[i - 2], g[i], g[i - 1]);
                  break;
                case 195:
                  this.$ = new e.Assign(g[i - 4], g[i - 1], g[i - 3]);
                  break;
                case 196:
                  this.$ = new e.Extends(g[i - 2], g[i])
                }
              },
              table: [{
                1: [2, 1],
                3: 1,
                4: 2,
                5: 3,
                7: 4,
                8: 6,
                9: 7,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 5],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [3]
              }, {
                1: [2, 2],
                6: [1, 72]
              }, {
                6: [1, 73]
              }, {
                1: [2, 4],
                6: [2, 4],
                26: [2, 4],
                99: [2, 4]
              }, {
                4: 75,
                7: 4,
                8: 6,
                9: 7,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                26: [1, 74],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 7],
                6: [2, 7],
                26: [2, 7],
                99: [2, 7],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 8],
                6: [2, 8],
                26: [2, 8],
                99: [2, 8],
                100: 88,
                101: [1, 63],
                103: [1, 64],
                106: 89,
                107: [1, 66],
                108: 67,
                123: [1, 87]
              }, {
                1: [2, 12],
                6: [2, 12],
                25: [2, 12],
                26: [2, 12],
                47: [2, 12],
                52: [2, 12],
                55: [2, 12],
                60: 91,
                64: [1, 93],
                65: [1, 94],
                66: [1, 95],
                67: 96,
                68: [1, 97],
                70: [2, 12],
                71: [1, 98],
                75: [2, 12],
                78: 90,
                81: [1, 92],
                82: [2, 103],
                83: [2, 12],
                88: [2, 12],
                90: [2, 12],
                99: [2, 12],
                101: [2, 12],
                102: [2, 12],
                103: [2, 12],
                107: [2, 12],
                115: [2, 12],
                123: [2, 12],
                125: [2, 12],
                126: [2, 12],
                129: [2, 12],
                130: [2, 12],
                131: [2, 12],
                132: [2, 12],
                133: [2, 12],
                134: [2, 12]
              }, {
                1: [2, 13],
                6: [2, 13],
                25: [2, 13],
                26: [2, 13],
                47: [2, 13],
                52: [2, 13],
                55: [2, 13],
                60: 100,
                64: [1, 93],
                65: [1, 94],
                66: [1, 95],
                67: 96,
                68: [1, 97],
                70: [2, 13],
                71: [1, 98],
                75: [2, 13],
                78: 99,
                81: [1, 92],
                82: [2, 103],
                83: [2, 13],
                88: [2, 13],
                90: [2, 13],
                99: [2, 13],
                101: [2, 13],
                102: [2, 13],
                103: [2, 13],
                107: [2, 13],
                115: [2, 13],
                123: [2, 13],
                125: [2, 13],
                126: [2, 13],
                129: [2, 13],
                130: [2, 13],
                131: [2, 13],
                132: [2, 13],
                133: [2, 13],
                134: [2, 13]
              }, {
                1: [2, 14],
                6: [2, 14],
                25: [2, 14],
                26: [2, 14],
                47: [2, 14],
                52: [2, 14],
                55: [2, 14],
                70: [2, 14],
                75: [2, 14],
                83: [2, 14],
                88: [2, 14],
                90: [2, 14],
                99: [2, 14],
                101: [2, 14],
                102: [2, 14],
                103: [2, 14],
                107: [2, 14],
                115: [2, 14],
                123: [2, 14],
                125: [2, 14],
                126: [2, 14],
                129: [2, 14],
                130: [2, 14],
                131: [2, 14],
                132: [2, 14],
                133: [2, 14],
                134: [2, 14]
              }, {
                1: [2, 15],
                6: [2, 15],
                25: [2, 15],
                26: [2, 15],
                47: [2, 15],
                52: [2, 15],
                55: [2, 15],
                70: [2, 15],
                75: [2, 15],
                83: [2, 15],
                88: [2, 15],
                90: [2, 15],
                99: [2, 15],
                101: [2, 15],
                102: [2, 15],
                103: [2, 15],
                107: [2, 15],
                115: [2, 15],
                123: [2, 15],
                125: [2, 15],
                126: [2, 15],
                129: [2, 15],
                130: [2, 15],
                131: [2, 15],
                132: [2, 15],
                133: [2, 15],
                134: [2, 15]
              }, {
                1: [2, 16],
                6: [2, 16],
                25: [2, 16],
                26: [2, 16],
                47: [2, 16],
                52: [2, 16],
                55: [2, 16],
                70: [2, 16],
                75: [2, 16],
                83: [2, 16],
                88: [2, 16],
                90: [2, 16],
                99: [2, 16],
                101: [2, 16],
                102: [2, 16],
                103: [2, 16],
                107: [2, 16],
                115: [2, 16],
                123: [2, 16],
                125: [2, 16],
                126: [2, 16],
                129: [2, 16],
                130: [2, 16],
                131: [2, 16],
                132: [2, 16],
                133: [2, 16],
                134: [2, 16]
              }, {
                1: [2, 17],
                6: [2, 17],
                25: [2, 17],
                26: [2, 17],
                47: [2, 17],
                52: [2, 17],
                55: [2, 17],
                70: [2, 17],
                75: [2, 17],
                83: [2, 17],
                88: [2, 17],
                90: [2, 17],
                99: [2, 17],
                101: [2, 17],
                102: [2, 17],
                103: [2, 17],
                107: [2, 17],
                115: [2, 17],
                123: [2, 17],
                125: [2, 17],
                126: [2, 17],
                129: [2, 17],
                130: [2, 17],
                131: [2, 17],
                132: [2, 17],
                133: [2, 17],
                134: [2, 17]
              }, {
                1: [2, 18],
                6: [2, 18],
                25: [2, 18],
                26: [2, 18],
                47: [2, 18],
                52: [2, 18],
                55: [2, 18],
                70: [2, 18],
                75: [2, 18],
                83: [2, 18],
                88: [2, 18],
                90: [2, 18],
                99: [2, 18],
                101: [2, 18],
                102: [2, 18],
                103: [2, 18],
                107: [2, 18],
                115: [2, 18],
                123: [2, 18],
                125: [2, 18],
                126: [2, 18],
                129: [2, 18],
                130: [2, 18],
                131: [2, 18],
                132: [2, 18],
                133: [2, 18],
                134: [2, 18]
              }, {
                1: [2, 19],
                6: [2, 19],
                25: [2, 19],
                26: [2, 19],
                47: [2, 19],
                52: [2, 19],
                55: [2, 19],
                70: [2, 19],
                75: [2, 19],
                83: [2, 19],
                88: [2, 19],
                90: [2, 19],
                99: [2, 19],
                101: [2, 19],
                102: [2, 19],
                103: [2, 19],
                107: [2, 19],
                115: [2, 19],
                123: [2, 19],
                125: [2, 19],
                126: [2, 19],
                129: [2, 19],
                130: [2, 19],
                131: [2, 19],
                132: [2, 19],
                133: [2, 19],
                134: [2, 19]
              }, {
                1: [2, 20],
                6: [2, 20],
                25: [2, 20],
                26: [2, 20],
                47: [2, 20],
                52: [2, 20],
                55: [2, 20],
                70: [2, 20],
                75: [2, 20],
                83: [2, 20],
                88: [2, 20],
                90: [2, 20],
                99: [2, 20],
                101: [2, 20],
                102: [2, 20],
                103: [2, 20],
                107: [2, 20],
                115: [2, 20],
                123: [2, 20],
                125: [2, 20],
                126: [2, 20],
                129: [2, 20],
                130: [2, 20],
                131: [2, 20],
                132: [2, 20],
                133: [2, 20],
                134: [2, 20]
              }, {
                1: [2, 21],
                6: [2, 21],
                25: [2, 21],
                26: [2, 21],
                47: [2, 21],
                52: [2, 21],
                55: [2, 21],
                70: [2, 21],
                75: [2, 21],
                83: [2, 21],
                88: [2, 21],
                90: [2, 21],
                99: [2, 21],
                101: [2, 21],
                102: [2, 21],
                103: [2, 21],
                107: [2, 21],
                115: [2, 21],
                123: [2, 21],
                125: [2, 21],
                126: [2, 21],
                129: [2, 21],
                130: [2, 21],
                131: [2, 21],
                132: [2, 21],
                133: [2, 21],
                134: [2, 21]
              }, {
                1: [2, 22],
                6: [2, 22],
                25: [2, 22],
                26: [2, 22],
                47: [2, 22],
                52: [2, 22],
                55: [2, 22],
                70: [2, 22],
                75: [2, 22],
                83: [2, 22],
                88: [2, 22],
                90: [2, 22],
                99: [2, 22],
                101: [2, 22],
                102: [2, 22],
                103: [2, 22],
                107: [2, 22],
                115: [2, 22],
                123: [2, 22],
                125: [2, 22],
                126: [2, 22],
                129: [2, 22],
                130: [2, 22],
                131: [2, 22],
                132: [2, 22],
                133: [2, 22],
                134: [2, 22]
              }, {
                1: [2, 23],
                6: [2, 23],
                25: [2, 23],
                26: [2, 23],
                47: [2, 23],
                52: [2, 23],
                55: [2, 23],
                70: [2, 23],
                75: [2, 23],
                83: [2, 23],
                88: [2, 23],
                90: [2, 23],
                99: [2, 23],
                101: [2, 23],
                102: [2, 23],
                103: [2, 23],
                107: [2, 23],
                115: [2, 23],
                123: [2, 23],
                125: [2, 23],
                126: [2, 23],
                129: [2, 23],
                130: [2, 23],
                131: [2, 23],
                132: [2, 23],
                133: [2, 23],
                134: [2, 23]
              }, {
                1: [2, 9],
                6: [2, 9],
                26: [2, 9],
                99: [2, 9],
                101: [2, 9],
                103: [2, 9],
                107: [2, 9],
                123: [2, 9]
              }, {
                1: [2, 10],
                6: [2, 10],
                26: [2, 10],
                99: [2, 10],
                101: [2, 10],
                103: [2, 10],
                107: [2, 10],
                123: [2, 10]
              }, {
                1: [2, 11],
                6: [2, 11],
                26: [2, 11],
                99: [2, 11],
                101: [2, 11],
                103: [2, 11],
                107: [2, 11],
                123: [2, 11]
              }, {
                1: [2, 71],
                6: [2, 71],
                25: [2, 71],
                26: [2, 71],
                38: [1, 101],
                47: [2, 71],
                52: [2, 71],
                55: [2, 71],
                64: [2, 71],
                65: [2, 71],
                66: [2, 71],
                68: [2, 71],
                70: [2, 71],
                71: [2, 71],
                75: [2, 71],
                81: [2, 71],
                82: [2, 71],
                83: [2, 71],
                88: [2, 71],
                90: [2, 71],
                99: [2, 71],
                101: [2, 71],
                102: [2, 71],
                103: [2, 71],
                107: [2, 71],
                115: [2, 71],
                123: [2, 71],
                125: [2, 71],
                126: [2, 71],
                129: [2, 71],
                130: [2, 71],
                131: [2, 71],
                132: [2, 71],
                133: [2, 71],
                134: [2, 71]
              }, {
                1: [2, 72],
                6: [2, 72],
                25: [2, 72],
                26: [2, 72],
                47: [2, 72],
                52: [2, 72],
                55: [2, 72],
                64: [2, 72],
                65: [2, 72],
                66: [2, 72],
                68: [2, 72],
                70: [2, 72],
                71: [2, 72],
                75: [2, 72],
                81: [2, 72],
                82: [2, 72],
                83: [2, 72],
                88: [2, 72],
                90: [2, 72],
                99: [2, 72],
                101: [2, 72],
                102: [2, 72],
                103: [2, 72],
                107: [2, 72],
                115: [2, 72],
                123: [2, 72],
                125: [2, 72],
                126: [2, 72],
                129: [2, 72],
                130: [2, 72],
                131: [2, 72],
                132: [2, 72],
                133: [2, 72],
                134: [2, 72]
              }, {
                1: [2, 73],
                6: [2, 73],
                25: [2, 73],
                26: [2, 73],
                47: [2, 73],
                52: [2, 73],
                55: [2, 73],
                64: [2, 73],
                65: [2, 73],
                66: [2, 73],
                68: [2, 73],
                70: [2, 73],
                71: [2, 73],
                75: [2, 73],
                81: [2, 73],
                82: [2, 73],
                83: [2, 73],
                88: [2, 73],
                90: [2, 73],
                99: [2, 73],
                101: [2, 73],
                102: [2, 73],
                103: [2, 73],
                107: [2, 73],
                115: [2, 73],
                123: [2, 73],
                125: [2, 73],
                126: [2, 73],
                129: [2, 73],
                130: [2, 73],
                131: [2, 73],
                132: [2, 73],
                133: [2, 73],
                134: [2, 73]
              }, {
                1: [2, 74],
                6: [2, 74],
                25: [2, 74],
                26: [2, 74],
                47: [2, 74],
                52: [2, 74],
                55: [2, 74],
                64: [2, 74],
                65: [2, 74],
                66: [2, 74],
                68: [2, 74],
                70: [2, 74],
                71: [2, 74],
                75: [2, 74],
                81: [2, 74],
                82: [2, 74],
                83: [2, 74],
                88: [2, 74],
                90: [2, 74],
                99: [2, 74],
                101: [2, 74],
                102: [2, 74],
                103: [2, 74],
                107: [2, 74],
                115: [2, 74],
                123: [2, 74],
                125: [2, 74],
                126: [2, 74],
                129: [2, 74],
                130: [2, 74],
                131: [2, 74],
                132: [2, 74],
                133: [2, 74],
                134: [2, 74]
              }, {
                1: [2, 75],
                6: [2, 75],
                25: [2, 75],
                26: [2, 75],
                47: [2, 75],
                52: [2, 75],
                55: [2, 75],
                64: [2, 75],
                65: [2, 75],
                66: [2, 75],
                68: [2, 75],
                70: [2, 75],
                71: [2, 75],
                75: [2, 75],
                81: [2, 75],
                82: [2, 75],
                83: [2, 75],
                88: [2, 75],
                90: [2, 75],
                99: [2, 75],
                101: [2, 75],
                102: [2, 75],
                103: [2, 75],
                107: [2, 75],
                115: [2, 75],
                123: [2, 75],
                125: [2, 75],
                126: [2, 75],
                129: [2, 75],
                130: [2, 75],
                131: [2, 75],
                132: [2, 75],
                133: [2, 75],
                134: [2, 75]
              }, {
                1: [2, 101],
                6: [2, 101],
                25: [2, 101],
                26: [2, 101],
                47: [2, 101],
                52: [2, 101],
                55: [2, 101],
                64: [2, 101],
                65: [2, 101],
                66: [2, 101],
                68: [2, 101],
                70: [2, 101],
                71: [2, 101],
                75: [2, 101],
                79: 102,
                81: [2, 101],
                82: [1, 103],
                83: [2, 101],
                88: [2, 101],
                90: [2, 101],
                99: [2, 101],
                101: [2, 101],
                102: [2, 101],
                103: [2, 101],
                107: [2, 101],
                115: [2, 101],
                123: [2, 101],
                125: [2, 101],
                126: [2, 101],
                129: [2, 101],
                130: [2, 101],
                131: [2, 101],
                132: [2, 101],
                133: [2, 101],
                134: [2, 101]
              }, {
                27: 107,
                28: [1, 71],
                42: 108,
                46: 104,
                47: [2, 53],
                52: [2, 53],
                53: 105,
                54: 106,
                56: 109,
                57: 110,
                73: [1, 68],
                86: [1, 111],
                87: [1, 112]
              }, {
                5: 113,
                25: [1, 5]
              }, {
                8: 114,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 116,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 117,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                13: 119,
                14: 120,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 121,
                42: 61,
                56: 47,
                57: 48,
                59: 118,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                98: [1, 54]
              }, {
                13: 119,
                14: 120,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 121,
                42: 61,
                56: 47,
                57: 48,
                59: 122,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                98: [1, 54]
              }, {
                1: [2, 68],
                6: [2, 68],
                25: [2, 68],
                26: [2, 68],
                38: [2, 68],
                47: [2, 68],
                52: [2, 68],
                55: [2, 68],
                64: [2, 68],
                65: [2, 68],
                66: [2, 68],
                68: [2, 68],
                70: [2, 68],
                71: [2, 68],
                75: [2, 68],
                77: [1, 126],
                81: [2, 68],
                82: [2, 68],
                83: [2, 68],
                88: [2, 68],
                90: [2, 68],
                99: [2, 68],
                101: [2, 68],
                102: [2, 68],
                103: [2, 68],
                107: [2, 68],
                115: [2, 68],
                123: [2, 68],
                125: [2, 68],
                126: [2, 68],
                127: [1, 123],
                128: [1, 124],
                129: [2, 68],
                130: [2, 68],
                131: [2, 68],
                132: [2, 68],
                133: [2, 68],
                134: [2, 68],
                135: [1, 125]
              }, {
                1: [2, 175],
                6: [2, 175],
                25: [2, 175],
                26: [2, 175],
                47: [2, 175],
                52: [2, 175],
                55: [2, 175],
                70: [2, 175],
                75: [2, 175],
                83: [2, 175],
                88: [2, 175],
                90: [2, 175],
                99: [2, 175],
                101: [2, 175],
                102: [2, 175],
                103: [2, 175],
                107: [2, 175],
                115: [2, 175],
                118: [1, 127],
                123: [2, 175],
                125: [2, 175],
                126: [2, 175],
                129: [2, 175],
                130: [2, 175],
                131: [2, 175],
                132: [2, 175],
                133: [2, 175],
                134: [2, 175]
              }, {
                5: 128,
                25: [1, 5]
              }, {
                5: 129,
                25: [1, 5]
              }, {
                1: [2, 143],
                6: [2, 143],
                25: [2, 143],
                26: [2, 143],
                47: [2, 143],
                52: [2, 143],
                55: [2, 143],
                70: [2, 143],
                75: [2, 143],
                83: [2, 143],
                88: [2, 143],
                90: [2, 143],
                99: [2, 143],
                101: [2, 143],
                102: [2, 143],
                103: [2, 143],
                107: [2, 143],
                115: [2, 143],
                123: [2, 143],
                125: [2, 143],
                126: [2, 143],
                129: [2, 143],
                130: [2, 143],
                131: [2, 143],
                132: [2, 143],
                133: [2, 143],
                134: [2, 143]
              }, {
                5: 130,
                25: [1, 5]
              }, {
                8: 131,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 132],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 91],
                5: 133,
                6: [2, 91],
                13: 119,
                14: 120,
                25: [1, 5],
                26: [2, 91],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 121,
                42: 61,
                47: [2, 91],
                52: [2, 91],
                55: [2, 91],
                56: 47,
                57: 48,
                59: 135,
                61: 25,
                62: 26,
                63: 27,
                70: [2, 91],
                73: [1, 68],
                75: [2, 91],
                77: [1, 134],
                80: [1, 28],
                83: [2, 91],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                88: [2, 91],
                90: [2, 91],
                98: [1, 54],
                99: [2, 91],
                101: [2, 91],
                102: [2, 91],
                103: [2, 91],
                107: [2, 91],
                115: [2, 91],
                123: [2, 91],
                125: [2, 91],
                126: [2, 91],
                129: [2, 91],
                130: [2, 91],
                131: [2, 91],
                132: [2, 91],
                133: [2, 91],
                134: [2, 91]
              }, {
                8: 136,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 45],
                6: [2, 45],
                8: 137,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                26: [2, 45],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                99: [2, 45],
                100: 39,
                101: [2, 45],
                103: [2, 45],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [2, 45],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                123: [2, 45],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 46],
                6: [2, 46],
                25: [2, 46],
                26: [2, 46],
                52: [2, 46],
                75: [2, 46],
                99: [2, 46],
                101: [2, 46],
                103: [2, 46],
                107: [2, 46],
                123: [2, 46]
              }, {
                1: [2, 69],
                6: [2, 69],
                25: [2, 69],
                26: [2, 69],
                38: [2, 69],
                47: [2, 69],
                52: [2, 69],
                55: [2, 69],
                64: [2, 69],
                65: [2, 69],
                66: [2, 69],
                68: [2, 69],
                70: [2, 69],
                71: [2, 69],
                75: [2, 69],
                81: [2, 69],
                82: [2, 69],
                83: [2, 69],
                88: [2, 69],
                90: [2, 69],
                99: [2, 69],
                101: [2, 69],
                102: [2, 69],
                103: [2, 69],
                107: [2, 69],
                115: [2, 69],
                123: [2, 69],
                125: [2, 69],
                126: [2, 69],
                129: [2, 69],
                130: [2, 69],
                131: [2, 69],
                132: [2, 69],
                133: [2, 69],
                134: [2, 69]
              }, {
                1: [2, 70],
                6: [2, 70],
                25: [2, 70],
                26: [2, 70],
                38: [2, 70],
                47: [2, 70],
                52: [2, 70],
                55: [2, 70],
                64: [2, 70],
                65: [2, 70],
                66: [2, 70],
                68: [2, 70],
                70: [2, 70],
                71: [2, 70],
                75: [2, 70],
                81: [2, 70],
                82: [2, 70],
                83: [2, 70],
                88: [2, 70],
                90: [2, 70],
                99: [2, 70],
                101: [2, 70],
                102: [2, 70],
                103: [2, 70],
                107: [2, 70],
                115: [2, 70],
                123: [2, 70],
                125: [2, 70],
                126: [2, 70],
                129: [2, 70],
                130: [2, 70],
                131: [2, 70],
                132: [2, 70],
                133: [2, 70],
                134: [2, 70]
              }, {
                1: [2, 29],
                6: [2, 29],
                25: [2, 29],
                26: [2, 29],
                47: [2, 29],
                52: [2, 29],
                55: [2, 29],
                64: [2, 29],
                65: [2, 29],
                66: [2, 29],
                68: [2, 29],
                70: [2, 29],
                71: [2, 29],
                75: [2, 29],
                81: [2, 29],
                82: [2, 29],
                83: [2, 29],
                88: [2, 29],
                90: [2, 29],
                99: [2, 29],
                101: [2, 29],
                102: [2, 29],
                103: [2, 29],
                107: [2, 29],
                115: [2, 29],
                123: [2, 29],
                125: [2, 29],
                126: [2, 29],
                129: [2, 29],
                130: [2, 29],
                131: [2, 29],
                132: [2, 29],
                133: [2, 29],
                134: [2, 29]
              }, {
                1: [2, 30],
                6: [2, 30],
                25: [2, 30],
                26: [2, 30],
                47: [2, 30],
                52: [2, 30],
                55: [2, 30],
                64: [2, 30],
                65: [2, 30],
                66: [2, 30],
                68: [2, 30],
                70: [2, 30],
                71: [2, 30],
                75: [2, 30],
                81: [2, 30],
                82: [2, 30],
                83: [2, 30],
                88: [2, 30],
                90: [2, 30],
                99: [2, 30],
                101: [2, 30],
                102: [2, 30],
                103: [2, 30],
                107: [2, 30],
                115: [2, 30],
                123: [2, 30],
                125: [2, 30],
                126: [2, 30],
                129: [2, 30],
                130: [2, 30],
                131: [2, 30],
                132: [2, 30],
                133: [2, 30],
                134: [2, 30]
              }, {
                1: [2, 31],
                6: [2, 31],
                25: [2, 31],
                26: [2, 31],
                47: [2, 31],
                52: [2, 31],
                55: [2, 31],
                64: [2, 31],
                65: [2, 31],
                66: [2, 31],
                68: [2, 31],
                70: [2, 31],
                71: [2, 31],
                75: [2, 31],
                81: [2, 31],
                82: [2, 31],
                83: [2, 31],
                88: [2, 31],
                90: [2, 31],
                99: [2, 31],
                101: [2, 31],
                102: [2, 31],
                103: [2, 31],
                107: [2, 31],
                115: [2, 31],
                123: [2, 31],
                125: [2, 31],
                126: [2, 31],
                129: [2, 31],
                130: [2, 31],
                131: [2, 31],
                132: [2, 31],
                133: [2, 31],
                134: [2, 31]
              }, {
                1: [2, 32],
                6: [2, 32],
                25: [2, 32],
                26: [2, 32],
                47: [2, 32],
                52: [2, 32],
                55: [2, 32],
                64: [2, 32],
                65: [2, 32],
                66: [2, 32],
                68: [2, 32],
                70: [2, 32],
                71: [2, 32],
                75: [2, 32],
                81: [2, 32],
                82: [2, 32],
                83: [2, 32],
                88: [2, 32],
                90: [2, 32],
                99: [2, 32],
                101: [2, 32],
                102: [2, 32],
                103: [2, 32],
                107: [2, 32],
                115: [2, 32],
                123: [2, 32],
                125: [2, 32],
                126: [2, 32],
                129: [2, 32],
                130: [2, 32],
                131: [2, 32],
                132: [2, 32],
                133: [2, 32],
                134: [2, 32]
              }, {
                1: [2, 33],
                6: [2, 33],
                25: [2, 33],
                26: [2, 33],
                47: [2, 33],
                52: [2, 33],
                55: [2, 33],
                64: [2, 33],
                65: [2, 33],
                66: [2, 33],
                68: [2, 33],
                70: [2, 33],
                71: [2, 33],
                75: [2, 33],
                81: [2, 33],
                82: [2, 33],
                83: [2, 33],
                88: [2, 33],
                90: [2, 33],
                99: [2, 33],
                101: [2, 33],
                102: [2, 33],
                103: [2, 33],
                107: [2, 33],
                115: [2, 33],
                123: [2, 33],
                125: [2, 33],
                126: [2, 33],
                129: [2, 33],
                130: [2, 33],
                131: [2, 33],
                132: [2, 33],
                133: [2, 33],
                134: [2, 33]
              }, {
                4: 138,
                7: 4,
                8: 6,
                9: 7,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 139],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 140,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 144],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                58: 145,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                84: 142,
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                88: [1, 141],
                91: 143,
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 107],
                6: [2, 107],
                25: [2, 107],
                26: [2, 107],
                47: [2, 107],
                52: [2, 107],
                55: [2, 107],
                64: [2, 107],
                65: [2, 107],
                66: [2, 107],
                68: [2, 107],
                70: [2, 107],
                71: [2, 107],
                75: [2, 107],
                81: [2, 107],
                82: [2, 107],
                83: [2, 107],
                88: [2, 107],
                90: [2, 107],
                99: [2, 107],
                101: [2, 107],
                102: [2, 107],
                103: [2, 107],
                107: [2, 107],
                115: [2, 107],
                123: [2, 107],
                125: [2, 107],
                126: [2, 107],
                129: [2, 107],
                130: [2, 107],
                131: [2, 107],
                132: [2, 107],
                133: [2, 107],
                134: [2, 107]
              }, {
                1: [2, 108],
                6: [2, 108],
                25: [2, 108],
                26: [2, 108],
                27: 146,
                28: [1, 71],
                47: [2, 108],
                52: [2, 108],
                55: [2, 108],
                64: [2, 108],
                65: [2, 108],
                66: [2, 108],
                68: [2, 108],
                70: [2, 108],
                71: [2, 108],
                75: [2, 108],
                81: [2, 108],
                82: [2, 108],
                83: [2, 108],
                88: [2, 108],
                90: [2, 108],
                99: [2, 108],
                101: [2, 108],
                102: [2, 108],
                103: [2, 108],
                107: [2, 108],
                115: [2, 108],
                123: [2, 108],
                125: [2, 108],
                126: [2, 108],
                129: [2, 108],
                130: [2, 108],
                131: [2, 108],
                132: [2, 108],
                133: [2, 108],
                134: [2, 108]
              }, {
                25: [2, 49]
              }, {
                25: [2, 50]
              }, {
                1: [2, 64],
                6: [2, 64],
                25: [2, 64],
                26: [2, 64],
                38: [2, 64],
                47: [2, 64],
                52: [2, 64],
                55: [2, 64],
                64: [2, 64],
                65: [2, 64],
                66: [2, 64],
                68: [2, 64],
                70: [2, 64],
                71: [2, 64],
                75: [2, 64],
                77: [2, 64],
                81: [2, 64],
                82: [2, 64],
                83: [2, 64],
                88: [2, 64],
                90: [2, 64],
                99: [2, 64],
                101: [2, 64],
                102: [2, 64],
                103: [2, 64],
                107: [2, 64],
                115: [2, 64],
                123: [2, 64],
                125: [2, 64],
                126: [2, 64],
                127: [2, 64],
                128: [2, 64],
                129: [2, 64],
                130: [2, 64],
                131: [2, 64],
                132: [2, 64],
                133: [2, 64],
                134: [2, 64],
                135: [2, 64]
              }, {
                1: [2, 67],
                6: [2, 67],
                25: [2, 67],
                26: [2, 67],
                38: [2, 67],
                47: [2, 67],
                52: [2, 67],
                55: [2, 67],
                64: [2, 67],
                65: [2, 67],
                66: [2, 67],
                68: [2, 67],
                70: [2, 67],
                71: [2, 67],
                75: [2, 67],
                77: [2, 67],
                81: [2, 67],
                82: [2, 67],
                83: [2, 67],
                88: [2, 67],
                90: [2, 67],
                99: [2, 67],
                101: [2, 67],
                102: [2, 67],
                103: [2, 67],
                107: [2, 67],
                115: [2, 67],
                123: [2, 67],
                125: [2, 67],
                126: [2, 67],
                127: [2, 67],
                128: [2, 67],
                129: [2, 67],
                130: [2, 67],
                131: [2, 67],
                132: [2, 67],
                133: [2, 67],
                134: [2, 67],
                135: [2, 67]
              }, {
                8: 147,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 148,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 149,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                5: 150,
                8: 151,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 5],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                27: 156,
                28: [1, 71],
                56: 157,
                57: 158,
                62: 152,
                73: [1, 68],
                87: [1, 55],
                110: 153,
                111: [1, 154],
                112: 155
              }, {
                109: 159,
                113: [1, 160],
                114: [1, 161]
              }, {
                6: [2, 86],
                11: 165,
                25: [2, 86],
                27: 166,
                28: [1, 71],
                29: 167,
                30: [1, 69],
                31: [1, 70],
                39: 163,
                40: 164,
                42: 168,
                44: [1, 46],
                52: [2, 86],
                74: 162,
                75: [2, 86],
                86: [1, 111]
              }, {
                1: [2, 27],
                6: [2, 27],
                25: [2, 27],
                26: [2, 27],
                41: [2, 27],
                47: [2, 27],
                52: [2, 27],
                55: [2, 27],
                64: [2, 27],
                65: [2, 27],
                66: [2, 27],
                68: [2, 27],
                70: [2, 27],
                71: [2, 27],
                75: [2, 27],
                81: [2, 27],
                82: [2, 27],
                83: [2, 27],
                88: [2, 27],
                90: [2, 27],
                99: [2, 27],
                101: [2, 27],
                102: [2, 27],
                103: [2, 27],
                107: [2, 27],
                115: [2, 27],
                123: [2, 27],
                125: [2, 27],
                126: [2, 27],
                129: [2, 27],
                130: [2, 27],
                131: [2, 27],
                132: [2, 27],
                133: [2, 27],
                134: [2, 27]
              }, {
                1: [2, 28],
                6: [2, 28],
                25: [2, 28],
                26: [2, 28],
                41: [2, 28],
                47: [2, 28],
                52: [2, 28],
                55: [2, 28],
                64: [2, 28],
                65: [2, 28],
                66: [2, 28],
                68: [2, 28],
                70: [2, 28],
                71: [2, 28],
                75: [2, 28],
                81: [2, 28],
                82: [2, 28],
                83: [2, 28],
                88: [2, 28],
                90: [2, 28],
                99: [2, 28],
                101: [2, 28],
                102: [2, 28],
                103: [2, 28],
                107: [2, 28],
                115: [2, 28],
                123: [2, 28],
                125: [2, 28],
                126: [2, 28],
                129: [2, 28],
                130: [2, 28],
                131: [2, 28],
                132: [2, 28],
                133: [2, 28],
                134: [2, 28]
              }, {
                1: [2, 26],
                6: [2, 26],
                25: [2, 26],
                26: [2, 26],
                38: [2, 26],
                41: [2, 26],
                47: [2, 26],
                52: [2, 26],
                55: [2, 26],
                64: [2, 26],
                65: [2, 26],
                66: [2, 26],
                68: [2, 26],
                70: [2, 26],
                71: [2, 26],
                75: [2, 26],
                77: [2, 26],
                81: [2, 26],
                82: [2, 26],
                83: [2, 26],
                88: [2, 26],
                90: [2, 26],
                99: [2, 26],
                101: [2, 26],
                102: [2, 26],
                103: [2, 26],
                107: [2, 26],
                113: [2, 26],
                114: [2, 26],
                115: [2, 26],
                123: [2, 26],
                125: [2, 26],
                126: [2, 26],
                127: [2, 26],
                128: [2, 26],
                129: [2, 26],
                130: [2, 26],
                131: [2, 26],
                132: [2, 26],
                133: [2, 26],
                134: [2, 26],
                135: [2, 26]
              }, {
                1: [2, 6],
                6: [2, 6],
                7: 169,
                8: 6,
                9: 7,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                26: [2, 6],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                99: [2, 6],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 3]
              }, {
                1: [2, 24],
                6: [2, 24],
                25: [2, 24],
                26: [2, 24],
                47: [2, 24],
                52: [2, 24],
                55: [2, 24],
                70: [2, 24],
                75: [2, 24],
                83: [2, 24],
                88: [2, 24],
                90: [2, 24],
                95: [2, 24],
                96: [2, 24],
                99: [2, 24],
                101: [2, 24],
                102: [2, 24],
                103: [2, 24],
                107: [2, 24],
                115: [2, 24],
                118: [2, 24],
                120: [2, 24],
                123: [2, 24],
                125: [2, 24],
                126: [2, 24],
                129: [2, 24],
                130: [2, 24],
                131: [2, 24],
                132: [2, 24],
                133: [2, 24],
                134: [2, 24]
              }, {
                6: [1, 72],
                26: [1, 170]
              }, {
                1: [2, 186],
                6: [2, 186],
                25: [2, 186],
                26: [2, 186],
                47: [2, 186],
                52: [2, 186],
                55: [2, 186],
                70: [2, 186],
                75: [2, 186],
                83: [2, 186],
                88: [2, 186],
                90: [2, 186],
                99: [2, 186],
                101: [2, 186],
                102: [2, 186],
                103: [2, 186],
                107: [2, 186],
                115: [2, 186],
                123: [2, 186],
                125: [2, 186],
                126: [2, 186],
                129: [2, 186],
                130: [2, 186],
                131: [2, 186],
                132: [2, 186],
                133: [2, 186],
                134: [2, 186]
              }, {
                8: 171,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 172,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 173,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 174,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 175,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 176,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 177,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 178,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 142],
                6: [2, 142],
                25: [2, 142],
                26: [2, 142],
                47: [2, 142],
                52: [2, 142],
                55: [2, 142],
                70: [2, 142],
                75: [2, 142],
                83: [2, 142],
                88: [2, 142],
                90: [2, 142],
                99: [2, 142],
                101: [2, 142],
                102: [2, 142],
                103: [2, 142],
                107: [2, 142],
                115: [2, 142],
                123: [2, 142],
                125: [2, 142],
                126: [2, 142],
                129: [2, 142],
                130: [2, 142],
                131: [2, 142],
                132: [2, 142],
                133: [2, 142],
                134: [2, 142]
              }, {
                1: [2, 147],
                6: [2, 147],
                25: [2, 147],
                26: [2, 147],
                47: [2, 147],
                52: [2, 147],
                55: [2, 147],
                70: [2, 147],
                75: [2, 147],
                83: [2, 147],
                88: [2, 147],
                90: [2, 147],
                99: [2, 147],
                101: [2, 147],
                102: [2, 147],
                103: [2, 147],
                107: [2, 147],
                115: [2, 147],
                123: [2, 147],
                125: [2, 147],
                126: [2, 147],
                129: [2, 147],
                130: [2, 147],
                131: [2, 147],
                132: [2, 147],
                133: [2, 147],
                134: [2, 147]
              }, {
                8: 179,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 141],
                6: [2, 141],
                25: [2, 141],
                26: [2, 141],
                47: [2, 141],
                52: [2, 141],
                55: [2, 141],
                70: [2, 141],
                75: [2, 141],
                83: [2, 141],
                88: [2, 141],
                90: [2, 141],
                99: [2, 141],
                101: [2, 141],
                102: [2, 141],
                103: [2, 141],
                107: [2, 141],
                115: [2, 141],
                123: [2, 141],
                125: [2, 141],
                126: [2, 141],
                129: [2, 141],
                130: [2, 141],
                131: [2, 141],
                132: [2, 141],
                133: [2, 141],
                134: [2, 141]
              }, {
                1: [2, 146],
                6: [2, 146],
                25: [2, 146],
                26: [2, 146],
                47: [2, 146],
                52: [2, 146],
                55: [2, 146],
                70: [2, 146],
                75: [2, 146],
                83: [2, 146],
                88: [2, 146],
                90: [2, 146],
                99: [2, 146],
                101: [2, 146],
                102: [2, 146],
                103: [2, 146],
                107: [2, 146],
                115: [2, 146],
                123: [2, 146],
                125: [2, 146],
                126: [2, 146],
                129: [2, 146],
                130: [2, 146],
                131: [2, 146],
                132: [2, 146],
                133: [2, 146],
                134: [2, 146]
              }, {
                79: 180,
                82: [1, 103]
              }, {
                1: [2, 65],
                6: [2, 65],
                25: [2, 65],
                26: [2, 65],
                38: [2, 65],
                47: [2, 65],
                52: [2, 65],
                55: [2, 65],
                64: [2, 65],
                65: [2, 65],
                66: [2, 65],
                68: [2, 65],
                70: [2, 65],
                71: [2, 65],
                75: [2, 65],
                77: [2, 65],
                81: [2, 65],
                82: [2, 65],
                83: [2, 65],
                88: [2, 65],
                90: [2, 65],
                99: [2, 65],
                101: [2, 65],
                102: [2, 65],
                103: [2, 65],
                107: [2, 65],
                115: [2, 65],
                123: [2, 65],
                125: [2, 65],
                126: [2, 65],
                127: [2, 65],
                128: [2, 65],
                129: [2, 65],
                130: [2, 65],
                131: [2, 65],
                132: [2, 65],
                133: [2, 65],
                134: [2, 65],
                135: [2, 65]
              }, {
                82: [2, 104]
              }, {
                27: 181,
                28: [1, 71]
              }, {
                27: 182,
                28: [1, 71]
              }, {
                1: [2, 79],
                6: [2, 79],
                25: [2, 79],
                26: [2, 79],
                27: 183,
                28: [1, 71],
                38: [2, 79],
                47: [2, 79],
                52: [2, 79],
                55: [2, 79],
                64: [2, 79],
                65: [2, 79],
                66: [2, 79],
                68: [2, 79],
                70: [2, 79],
                71: [2, 79],
                75: [2, 79],
                77: [2, 79],
                81: [2, 79],
                82: [2, 79],
                83: [2, 79],
                88: [2, 79],
                90: [2, 79],
                99: [2, 79],
                101: [2, 79],
                102: [2, 79],
                103: [2, 79],
                107: [2, 79],
                115: [2, 79],
                123: [2, 79],
                125: [2, 79],
                126: [2, 79],
                127: [2, 79],
                128: [2, 79],
                129: [2, 79],
                130: [2, 79],
                131: [2, 79],
                132: [2, 79],
                133: [2, 79],
                134: [2, 79],
                135: [2, 79]
              }, {
                1: [2, 80],
                6: [2, 80],
                25: [2, 80],
                26: [2, 80],
                38: [2, 80],
                47: [2, 80],
                52: [2, 80],
                55: [2, 80],
                64: [2, 80],
                65: [2, 80],
                66: [2, 80],
                68: [2, 80],
                70: [2, 80],
                71: [2, 80],
                75: [2, 80],
                77: [2, 80],
                81: [2, 80],
                82: [2, 80],
                83: [2, 80],
                88: [2, 80],
                90: [2, 80],
                99: [2, 80],
                101: [2, 80],
                102: [2, 80],
                103: [2, 80],
                107: [2, 80],
                115: [2, 80],
                123: [2, 80],
                125: [2, 80],
                126: [2, 80],
                127: [2, 80],
                128: [2, 80],
                129: [2, 80],
                130: [2, 80],
                131: [2, 80],
                132: [2, 80],
                133: [2, 80],
                134: [2, 80],
                135: [2, 80]
              }, {
                8: 185,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                55: [1, 189],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                69: 184,
                72: 186,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                89: 187,
                90: [1, 188],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                67: 190,
                68: [1, 97],
                71: [1, 98]
              }, {
                79: 191,
                82: [1, 103]
              }, {
                1: [2, 66],
                6: [2, 66],
                25: [2, 66],
                26: [2, 66],
                38: [2, 66],
                47: [2, 66],
                52: [2, 66],
                55: [2, 66],
                64: [2, 66],
                65: [2, 66],
                66: [2, 66],
                68: [2, 66],
                70: [2, 66],
                71: [2, 66],
                75: [2, 66],
                77: [2, 66],
                81: [2, 66],
                82: [2, 66],
                83: [2, 66],
                88: [2, 66],
                90: [2, 66],
                99: [2, 66],
                101: [2, 66],
                102: [2, 66],
                103: [2, 66],
                107: [2, 66],
                115: [2, 66],
                123: [2, 66],
                125: [2, 66],
                126: [2, 66],
                127: [2, 66],
                128: [2, 66],
                129: [2, 66],
                130: [2, 66],
                131: [2, 66],
                132: [2, 66],
                133: [2, 66],
                134: [2, 66],
                135: [2, 66]
              }, {
                6: [1, 193],
                8: 192,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 194],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 102],
                6: [2, 102],
                25: [2, 102],
                26: [2, 102],
                47: [2, 102],
                52: [2, 102],
                55: [2, 102],
                64: [2, 102],
                65: [2, 102],
                66: [2, 102],
                68: [2, 102],
                70: [2, 102],
                71: [2, 102],
                75: [2, 102],
                81: [2, 102],
                82: [2, 102],
                83: [2, 102],
                88: [2, 102],
                90: [2, 102],
                99: [2, 102],
                101: [2, 102],
                102: [2, 102],
                103: [2, 102],
                107: [2, 102],
                115: [2, 102],
                123: [2, 102],
                125: [2, 102],
                126: [2, 102],
                129: [2, 102],
                130: [2, 102],
                131: [2, 102],
                132: [2, 102],
                133: [2, 102],
                134: [2, 102]
              }, {
                8: 197,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 144],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                58: 145,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                83: [1, 195],
                84: 196,
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                91: 143,
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                47: [1, 198],
                52: [1, 199]
              }, {
                47: [2, 54],
                52: [2, 54]
              }, {
                38: [1, 201],
                47: [2, 56],
                52: [2, 56],
                55: [1, 200]
              }, {
                38: [2, 59],
                47: [2, 59],
                52: [2, 59],
                55: [2, 59]
              }, {
                38: [2, 60],
                47: [2, 60],
                52: [2, 60],
                55: [2, 60]
              }, {
                38: [2, 61],
                47: [2, 61],
                52: [2, 61],
                55: [2, 61]
              }, {
                38: [2, 62],
                47: [2, 62],
                52: [2, 62],
                55: [2, 62]
              }, {
                27: 146,
                28: [1, 71]
              }, {
                8: 197,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 144],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                58: 145,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                84: 142,
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                88: [1, 141],
                91: 143,
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 48],
                6: [2, 48],
                25: [2, 48],
                26: [2, 48],
                47: [2, 48],
                52: [2, 48],
                55: [2, 48],
                70: [2, 48],
                75: [2, 48],
                83: [2, 48],
                88: [2, 48],
                90: [2, 48],
                99: [2, 48],
                101: [2, 48],
                102: [2, 48],
                103: [2, 48],
                107: [2, 48],
                115: [2, 48],
                123: [2, 48],
                125: [2, 48],
                126: [2, 48],
                129: [2, 48],
                130: [2, 48],
                131: [2, 48],
                132: [2, 48],
                133: [2, 48],
                134: [2, 48]
              }, {
                1: [2, 179],
                6: [2, 179],
                25: [2, 179],
                26: [2, 179],
                47: [2, 179],
                52: [2, 179],
                55: [2, 179],
                70: [2, 179],
                75: [2, 179],
                83: [2, 179],
                88: [2, 179],
                90: [2, 179],
                99: [2, 179],
                100: 85,
                101: [2, 179],
                102: [2, 179],
                103: [2, 179],
                106: 86,
                107: [2, 179],
                108: 67,
                115: [2, 179],
                123: [2, 179],
                125: [2, 179],
                126: [2, 179],
                129: [1, 76],
                130: [2, 179],
                131: [2, 179],
                132: [2, 179],
                133: [2, 179],
                134: [2, 179]
              }, {
                100: 88,
                101: [1, 63],
                103: [1, 64],
                106: 89,
                107: [1, 66],
                108: 67,
                123: [1, 87]
              }, {
                1: [2, 180],
                6: [2, 180],
                25: [2, 180],
                26: [2, 180],
                47: [2, 180],
                52: [2, 180],
                55: [2, 180],
                70: [2, 180],
                75: [2, 180],
                83: [2, 180],
                88: [2, 180],
                90: [2, 180],
                99: [2, 180],
                100: 85,
                101: [2, 180],
                102: [2, 180],
                103: [2, 180],
                106: 86,
                107: [2, 180],
                108: 67,
                115: [2, 180],
                123: [2, 180],
                125: [2, 180],
                126: [2, 180],
                129: [1, 76],
                130: [2, 180],
                131: [2, 180],
                132: [2, 180],
                133: [2, 180],
                134: [2, 180]
              }, {
                1: [2, 181],
                6: [2, 181],
                25: [2, 181],
                26: [2, 181],
                47: [2, 181],
                52: [2, 181],
                55: [2, 181],
                70: [2, 181],
                75: [2, 181],
                83: [2, 181],
                88: [2, 181],
                90: [2, 181],
                99: [2, 181],
                100: 85,
                101: [2, 181],
                102: [2, 181],
                103: [2, 181],
                106: 86,
                107: [2, 181],
                108: 67,
                115: [2, 181],
                123: [2, 181],
                125: [2, 181],
                126: [2, 181],
                129: [1, 76],
                130: [2, 181],
                131: [2, 181],
                132: [2, 181],
                133: [2, 181],
                134: [2, 181]
              }, {
                1: [2, 182],
                6: [2, 182],
                25: [2, 182],
                26: [2, 182],
                47: [2, 182],
                52: [2, 182],
                55: [2, 182],
                64: [2, 68],
                65: [2, 68],
                66: [2, 68],
                68: [2, 68],
                70: [2, 182],
                71: [2, 68],
                75: [2, 182],
                81: [2, 68],
                82: [2, 68],
                83: [2, 182],
                88: [2, 182],
                90: [2, 182],
                99: [2, 182],
                101: [2, 182],
                102: [2, 182],
                103: [2, 182],
                107: [2, 182],
                115: [2, 182],
                123: [2, 182],
                125: [2, 182],
                126: [2, 182],
                129: [2, 182],
                130: [2, 182],
                131: [2, 182],
                132: [2, 182],
                133: [2, 182],
                134: [2, 182]
              }, {
                60: 91,
                64: [1, 93],
                65: [1, 94],
                66: [1, 95],
                67: 96,
                68: [1, 97],
                71: [1, 98],
                78: 90,
                81: [1, 92],
                82: [2, 103]
              }, {
                60: 100,
                64: [1, 93],
                65: [1, 94],
                66: [1, 95],
                67: 96,
                68: [1, 97],
                71: [1, 98],
                78: 99,
                81: [1, 92],
                82: [2, 103]
              }, {
                64: [2, 71],
                65: [2, 71],
                66: [2, 71],
                68: [2, 71],
                71: [2, 71],
                81: [2, 71],
                82: [2, 71]
              }, {
                1: [2, 183],
                6: [2, 183],
                25: [2, 183],
                26: [2, 183],
                47: [2, 183],
                52: [2, 183],
                55: [2, 183],
                64: [2, 68],
                65: [2, 68],
                66: [2, 68],
                68: [2, 68],
                70: [2, 183],
                71: [2, 68],
                75: [2, 183],
                81: [2, 68],
                82: [2, 68],
                83: [2, 183],
                88: [2, 183],
                90: [2, 183],
                99: [2, 183],
                101: [2, 183],
                102: [2, 183],
                103: [2, 183],
                107: [2, 183],
                115: [2, 183],
                123: [2, 183],
                125: [2, 183],
                126: [2, 183],
                129: [2, 183],
                130: [2, 183],
                131: [2, 183],
                132: [2, 183],
                133: [2, 183],
                134: [2, 183]
              }, {
                1: [2, 184],
                6: [2, 184],
                25: [2, 184],
                26: [2, 184],
                47: [2, 184],
                52: [2, 184],
                55: [2, 184],
                70: [2, 184],
                75: [2, 184],
                83: [2, 184],
                88: [2, 184],
                90: [2, 184],
                99: [2, 184],
                101: [2, 184],
                102: [2, 184],
                103: [2, 184],
                107: [2, 184],
                115: [2, 184],
                123: [2, 184],
                125: [2, 184],
                126: [2, 184],
                129: [2, 184],
                130: [2, 184],
                131: [2, 184],
                132: [2, 184],
                133: [2, 184],
                134: [2, 184]
              }, {
                1: [2, 185],
                6: [2, 185],
                25: [2, 185],
                26: [2, 185],
                47: [2, 185],
                52: [2, 185],
                55: [2, 185],
                70: [2, 185],
                75: [2, 185],
                83: [2, 185],
                88: [2, 185],
                90: [2, 185],
                99: [2, 185],
                101: [2, 185],
                102: [2, 185],
                103: [2, 185],
                107: [2, 185],
                115: [2, 185],
                123: [2, 185],
                125: [2, 185],
                126: [2, 185],
                129: [2, 185],
                130: [2, 185],
                131: [2, 185],
                132: [2, 185],
                133: [2, 185],
                134: [2, 185]
              }, {
                8: 202,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 203],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 204,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                5: 205,
                25: [1, 5],
                122: [1, 206]
              }, {
                1: [2, 128],
                6: [2, 128],
                25: [2, 128],
                26: [2, 128],
                47: [2, 128],
                52: [2, 128],
                55: [2, 128],
                70: [2, 128],
                75: [2, 128],
                83: [2, 128],
                88: [2, 128],
                90: [2, 128],
                94: 207,
                95: [1, 208],
                96: [1, 209],
                99: [2, 128],
                101: [2, 128],
                102: [2, 128],
                103: [2, 128],
                107: [2, 128],
                115: [2, 128],
                123: [2, 128],
                125: [2, 128],
                126: [2, 128],
                129: [2, 128],
                130: [2, 128],
                131: [2, 128],
                132: [2, 128],
                133: [2, 128],
                134: [2, 128]
              }, {
                1: [2, 140],
                6: [2, 140],
                25: [2, 140],
                26: [2, 140],
                47: [2, 140],
                52: [2, 140],
                55: [2, 140],
                70: [2, 140],
                75: [2, 140],
                83: [2, 140],
                88: [2, 140],
                90: [2, 140],
                99: [2, 140],
                101: [2, 140],
                102: [2, 140],
                103: [2, 140],
                107: [2, 140],
                115: [2, 140],
                123: [2, 140],
                125: [2, 140],
                126: [2, 140],
                129: [2, 140],
                130: [2, 140],
                131: [2, 140],
                132: [2, 140],
                133: [2, 140],
                134: [2, 140]
              }, {
                1: [2, 148],
                6: [2, 148],
                25: [2, 148],
                26: [2, 148],
                47: [2, 148],
                52: [2, 148],
                55: [2, 148],
                70: [2, 148],
                75: [2, 148],
                83: [2, 148],
                88: [2, 148],
                90: [2, 148],
                99: [2, 148],
                101: [2, 148],
                102: [2, 148],
                103: [2, 148],
                107: [2, 148],
                115: [2, 148],
                123: [2, 148],
                125: [2, 148],
                126: [2, 148],
                129: [2, 148],
                130: [2, 148],
                131: [2, 148],
                132: [2, 148],
                133: [2, 148],
                134: [2, 148]
              }, {
                25: [1, 210],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                117: 211,
                119: 212,
                120: [1, 213]
              }, {
                1: [2, 92],
                6: [2, 92],
                25: [2, 92],
                26: [2, 92],
                47: [2, 92],
                52: [2, 92],
                55: [2, 92],
                70: [2, 92],
                75: [2, 92],
                83: [2, 92],
                88: [2, 92],
                90: [2, 92],
                99: [2, 92],
                101: [2, 92],
                102: [2, 92],
                103: [2, 92],
                107: [2, 92],
                115: [2, 92],
                123: [2, 92],
                125: [2, 92],
                126: [2, 92],
                129: [2, 92],
                130: [2, 92],
                131: [2, 92],
                132: [2, 92],
                133: [2, 92],
                134: [2, 92]
              }, {
                8: 214,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 95],
                5: 215,
                6: [2, 95],
                25: [1, 5],
                26: [2, 95],
                47: [2, 95],
                52: [2, 95],
                55: [2, 95],
                64: [2, 68],
                65: [2, 68],
                66: [2, 68],
                68: [2, 68],
                70: [2, 95],
                71: [2, 68],
                75: [2, 95],
                77: [1, 216],
                81: [2, 68],
                82: [2, 68],
                83: [2, 95],
                88: [2, 95],
                90: [2, 95],
                99: [2, 95],
                101: [2, 95],
                102: [2, 95],
                103: [2, 95],
                107: [2, 95],
                115: [2, 95],
                123: [2, 95],
                125: [2, 95],
                126: [2, 95],
                129: [2, 95],
                130: [2, 95],
                131: [2, 95],
                132: [2, 95],
                133: [2, 95],
                134: [2, 95]
              }, {
                1: [2, 133],
                6: [2, 133],
                25: [2, 133],
                26: [2, 133],
                47: [2, 133],
                52: [2, 133],
                55: [2, 133],
                70: [2, 133],
                75: [2, 133],
                83: [2, 133],
                88: [2, 133],
                90: [2, 133],
                99: [2, 133],
                100: 85,
                101: [2, 133],
                102: [2, 133],
                103: [2, 133],
                106: 86,
                107: [2, 133],
                108: 67,
                115: [2, 133],
                123: [2, 133],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 44],
                6: [2, 44],
                26: [2, 44],
                99: [2, 44],
                100: 85,
                101: [2, 44],
                103: [2, 44],
                106: 86,
                107: [2, 44],
                108: 67,
                123: [2, 44],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                6: [1, 72],
                99: [1, 217]
              }, {
                4: 218,
                7: 4,
                8: 6,
                9: 7,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                6: [2, 124],
                25: [2, 124],
                52: [2, 124],
                55: [1, 220],
                88: [2, 124],
                89: 219,
                90: [1, 188],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 110],
                6: [2, 110],
                25: [2, 110],
                26: [2, 110],
                38: [2, 110],
                47: [2, 110],
                52: [2, 110],
                55: [2, 110],
                64: [2, 110],
                65: [2, 110],
                66: [2, 110],
                68: [2, 110],
                70: [2, 110],
                71: [2, 110],
                75: [2, 110],
                81: [2, 110],
                82: [2, 110],
                83: [2, 110],
                88: [2, 110],
                90: [2, 110],
                99: [2, 110],
                101: [2, 110],
                102: [2, 110],
                103: [2, 110],
                107: [2, 110],
                113: [2, 110],
                114: [2, 110],
                115: [2, 110],
                123: [2, 110],
                125: [2, 110],
                126: [2, 110],
                129: [2, 110],
                130: [2, 110],
                131: [2, 110],
                132: [2, 110],
                133: [2, 110],
                134: [2, 110]
              }, {
                6: [2, 51],
                25: [2, 51],
                51: 221,
                52: [1, 222],
                88: [2, 51]
              }, {
                6: [2, 119],
                25: [2, 119],
                26: [2, 119],
                52: [2, 119],
                83: [2, 119],
                88: [2, 119]
              }, {
                8: 197,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 144],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                58: 145,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                84: 223,
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                91: 143,
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                6: [2, 125],
                25: [2, 125],
                26: [2, 125],
                52: [2, 125],
                83: [2, 125],
                88: [2, 125]
              }, {
                1: [2, 109],
                6: [2, 109],
                25: [2, 109],
                26: [2, 109],
                38: [2, 109],
                41: [2, 109],
                47: [2, 109],
                52: [2, 109],
                55: [2, 109],
                64: [2, 109],
                65: [2, 109],
                66: [2, 109],
                68: [2, 109],
                70: [2, 109],
                71: [2, 109],
                75: [2, 109],
                77: [2, 109],
                81: [2, 109],
                82: [2, 109],
                83: [2, 109],
                88: [2, 109],
                90: [2, 109],
                99: [2, 109],
                101: [2, 109],
                102: [2, 109],
                103: [2, 109],
                107: [2, 109],
                115: [2, 109],
                123: [2, 109],
                125: [2, 109],
                126: [2, 109],
                127: [2, 109],
                128: [2, 109],
                129: [2, 109],
                130: [2, 109],
                131: [2, 109],
                132: [2, 109],
                133: [2, 109],
                134: [2, 109],
                135: [2, 109]
              }, {
                5: 224,
                25: [1, 5],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 136],
                6: [2, 136],
                25: [2, 136],
                26: [2, 136],
                47: [2, 136],
                52: [2, 136],
                55: [2, 136],
                70: [2, 136],
                75: [2, 136],
                83: [2, 136],
                88: [2, 136],
                90: [2, 136],
                99: [2, 136],
                100: 85,
                101: [1, 63],
                102: [1, 225],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                115: [2, 136],
                123: [2, 136],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 138],
                6: [2, 138],
                25: [2, 138],
                26: [2, 138],
                47: [2, 138],
                52: [2, 138],
                55: [2, 138],
                70: [2, 138],
                75: [2, 138],
                83: [2, 138],
                88: [2, 138],
                90: [2, 138],
                99: [2, 138],
                100: 85,
                101: [1, 63],
                102: [1, 226],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                115: [2, 138],
                123: [2, 138],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 144],
                6: [2, 144],
                25: [2, 144],
                26: [2, 144],
                47: [2, 144],
                52: [2, 144],
                55: [2, 144],
                70: [2, 144],
                75: [2, 144],
                83: [2, 144],
                88: [2, 144],
                90: [2, 144],
                99: [2, 144],
                101: [2, 144],
                102: [2, 144],
                103: [2, 144],
                107: [2, 144],
                115: [2, 144],
                123: [2, 144],
                125: [2, 144],
                126: [2, 144],
                129: [2, 144],
                130: [2, 144],
                131: [2, 144],
                132: [2, 144],
                133: [2, 144],
                134: [2, 144]
              }, {
                1: [2, 145],
                6: [2, 145],
                25: [2, 145],
                26: [2, 145],
                47: [2, 145],
                52: [2, 145],
                55: [2, 145],
                70: [2, 145],
                75: [2, 145],
                83: [2, 145],
                88: [2, 145],
                90: [2, 145],
                99: [2, 145],
                100: 85,
                101: [1, 63],
                102: [2, 145],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                115: [2, 145],
                123: [2, 145],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 149],
                6: [2, 149],
                25: [2, 149],
                26: [2, 149],
                47: [2, 149],
                52: [2, 149],
                55: [2, 149],
                70: [2, 149],
                75: [2, 149],
                83: [2, 149],
                88: [2, 149],
                90: [2, 149],
                99: [2, 149],
                101: [2, 149],
                102: [2, 149],
                103: [2, 149],
                107: [2, 149],
                115: [2, 149],
                123: [2, 149],
                125: [2, 149],
                126: [2, 149],
                129: [2, 149],
                130: [2, 149],
                131: [2, 149],
                132: [2, 149],
                133: [2, 149],
                134: [2, 149]
              }, {
                113: [2, 151],
                114: [2, 151]
              }, {
                27: 156,
                28: [1, 71],
                56: 157,
                57: 158,
                73: [1, 68],
                87: [1, 112],
                110: 227,
                112: 155
              }, {
                52: [1, 228],
                113: [2, 156],
                114: [2, 156]
              }, {
                52: [2, 153],
                113: [2, 153],
                114: [2, 153]
              }, {
                52: [2, 154],
                113: [2, 154],
                114: [2, 154]
              }, {
                52: [2, 155],
                113: [2, 155],
                114: [2, 155]
              }, {
                1: [2, 150],
                6: [2, 150],
                25: [2, 150],
                26: [2, 150],
                47: [2, 150],
                52: [2, 150],
                55: [2, 150],
                70: [2, 150],
                75: [2, 150],
                83: [2, 150],
                88: [2, 150],
                90: [2, 150],
                99: [2, 150],
                101: [2, 150],
                102: [2, 150],
                103: [2, 150],
                107: [2, 150],
                115: [2, 150],
                123: [2, 150],
                125: [2, 150],
                126: [2, 150],
                129: [2, 150],
                130: [2, 150],
                131: [2, 150],
                132: [2, 150],
                133: [2, 150],
                134: [2, 150]
              }, {
                8: 229,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 230,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                6: [2, 51],
                25: [2, 51],
                51: 231,
                52: [1, 232],
                75: [2, 51]
              }, {
                6: [2, 87],
                25: [2, 87],
                26: [2, 87],
                52: [2, 87],
                75: [2, 87]
              }, {
                6: [2, 37],
                25: [2, 37],
                26: [2, 37],
                41: [1, 233],
                52: [2, 37],
                75: [2, 37]
              }, {
                6: [2, 40],
                25: [2, 40],
                26: [2, 40],
                52: [2, 40],
                75: [2, 40]
              }, {
                6: [2, 41],
                25: [2, 41],
                26: [2, 41],
                41: [2, 41],
                52: [2, 41],
                75: [2, 41]
              }, {
                6: [2, 42],
                25: [2, 42],
                26: [2, 42],
                41: [2, 42],
                52: [2, 42],
                75: [2, 42]
              }, {
                6: [2, 43],
                25: [2, 43],
                26: [2, 43],
                41: [2, 43],
                52: [2, 43],
                75: [2, 43]
              }, {
                1: [2, 5],
                6: [2, 5],
                26: [2, 5],
                99: [2, 5]
              }, {
                1: [2, 25],
                6: [2, 25],
                25: [2, 25],
                26: [2, 25],
                47: [2, 25],
                52: [2, 25],
                55: [2, 25],
                70: [2, 25],
                75: [2, 25],
                83: [2, 25],
                88: [2, 25],
                90: [2, 25],
                95: [2, 25],
                96: [2, 25],
                99: [2, 25],
                101: [2, 25],
                102: [2, 25],
                103: [2, 25],
                107: [2, 25],
                115: [2, 25],
                118: [2, 25],
                120: [2, 25],
                123: [2, 25],
                125: [2, 25],
                126: [2, 25],
                129: [2, 25],
                130: [2, 25],
                131: [2, 25],
                132: [2, 25],
                133: [2, 25],
                134: [2, 25]
              }, {
                1: [2, 187],
                6: [2, 187],
                25: [2, 187],
                26: [2, 187],
                47: [2, 187],
                52: [2, 187],
                55: [2, 187],
                70: [2, 187],
                75: [2, 187],
                83: [2, 187],
                88: [2, 187],
                90: [2, 187],
                99: [2, 187],
                100: 85,
                101: [2, 187],
                102: [2, 187],
                103: [2, 187],
                106: 86,
                107: [2, 187],
                108: 67,
                115: [2, 187],
                123: [2, 187],
                125: [2, 187],
                126: [2, 187],
                129: [1, 76],
                130: [1, 79],
                131: [2, 187],
                132: [2, 187],
                133: [2, 187],
                134: [2, 187]
              }, {
                1: [2, 188],
                6: [2, 188],
                25: [2, 188],
                26: [2, 188],
                47: [2, 188],
                52: [2, 188],
                55: [2, 188],
                70: [2, 188],
                75: [2, 188],
                83: [2, 188],
                88: [2, 188],
                90: [2, 188],
                99: [2, 188],
                100: 85,
                101: [2, 188],
                102: [2, 188],
                103: [2, 188],
                106: 86,
                107: [2, 188],
                108: 67,
                115: [2, 188],
                123: [2, 188],
                125: [2, 188],
                126: [2, 188],
                129: [1, 76],
                130: [1, 79],
                131: [2, 188],
                132: [2, 188],
                133: [2, 188],
                134: [2, 188]
              }, {
                1: [2, 189],
                6: [2, 189],
                25: [2, 189],
                26: [2, 189],
                47: [2, 189],
                52: [2, 189],
                55: [2, 189],
                70: [2, 189],
                75: [2, 189],
                83: [2, 189],
                88: [2, 189],
                90: [2, 189],
                99: [2, 189],
                100: 85,
                101: [2, 189],
                102: [2, 189],
                103: [2, 189],
                106: 86,
                107: [2, 189],
                108: 67,
                115: [2, 189],
                123: [2, 189],
                125: [2, 189],
                126: [2, 189],
                129: [1, 76],
                130: [2, 189],
                131: [2, 189],
                132: [2, 189],
                133: [2, 189],
                134: [2, 189]
              }, {
                1: [2, 190],
                6: [2, 190],
                25: [2, 190],
                26: [2, 190],
                47: [2, 190],
                52: [2, 190],
                55: [2, 190],
                70: [2, 190],
                75: [2, 190],
                83: [2, 190],
                88: [2, 190],
                90: [2, 190],
                99: [2, 190],
                100: 85,
                101: [2, 190],
                102: [2, 190],
                103: [2, 190],
                106: 86,
                107: [2, 190],
                108: 67,
                115: [2, 190],
                123: [2, 190],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [2, 190],
                132: [2, 190],
                133: [2, 190],
                134: [2, 190]
              }, {
                1: [2, 191],
                6: [2, 191],
                25: [2, 191],
                26: [2, 191],
                47: [2, 191],
                52: [2, 191],
                55: [2, 191],
                70: [2, 191],
                75: [2, 191],
                83: [2, 191],
                88: [2, 191],
                90: [2, 191],
                99: [2, 191],
                100: 85,
                101: [2, 191],
                102: [2, 191],
                103: [2, 191],
                106: 86,
                107: [2, 191],
                108: 67,
                115: [2, 191],
                123: [2, 191],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [2, 191],
                133: [2, 191],
                134: [1, 83]
              }, {
                1: [2, 192],
                6: [2, 192],
                25: [2, 192],
                26: [2, 192],
                47: [2, 192],
                52: [2, 192],
                55: [2, 192],
                70: [2, 192],
                75: [2, 192],
                83: [2, 192],
                88: [2, 192],
                90: [2, 192],
                99: [2, 192],
                100: 85,
                101: [2, 192],
                102: [2, 192],
                103: [2, 192],
                106: 86,
                107: [2, 192],
                108: 67,
                115: [2, 192],
                123: [2, 192],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [2, 192],
                134: [1, 83]
              }, {
                1: [2, 193],
                6: [2, 193],
                25: [2, 193],
                26: [2, 193],
                47: [2, 193],
                52: [2, 193],
                55: [2, 193],
                70: [2, 193],
                75: [2, 193],
                83: [2, 193],
                88: [2, 193],
                90: [2, 193],
                99: [2, 193],
                100: 85,
                101: [2, 193],
                102: [2, 193],
                103: [2, 193],
                106: 86,
                107: [2, 193],
                108: 67,
                115: [2, 193],
                123: [2, 193],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [2, 193],
                133: [2, 193],
                134: [2, 193]
              }, {
                1: [2, 178],
                6: [2, 178],
                25: [2, 178],
                26: [2, 178],
                47: [2, 178],
                52: [2, 178],
                55: [2, 178],
                70: [2, 178],
                75: [2, 178],
                83: [2, 178],
                88: [2, 178],
                90: [2, 178],
                99: [2, 178],
                100: 85,
                101: [1, 63],
                102: [2, 178],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                115: [2, 178],
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 177],
                6: [2, 177],
                25: [2, 177],
                26: [2, 177],
                47: [2, 177],
                52: [2, 177],
                55: [2, 177],
                70: [2, 177],
                75: [2, 177],
                83: [2, 177],
                88: [2, 177],
                90: [2, 177],
                99: [2, 177],
                100: 85,
                101: [1, 63],
                102: [2, 177],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                115: [2, 177],
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 99],
                6: [2, 99],
                25: [2, 99],
                26: [2, 99],
                47: [2, 99],
                52: [2, 99],
                55: [2, 99],
                64: [2, 99],
                65: [2, 99],
                66: [2, 99],
                68: [2, 99],
                70: [2, 99],
                71: [2, 99],
                75: [2, 99],
                81: [2, 99],
                82: [2, 99],
                83: [2, 99],
                88: [2, 99],
                90: [2, 99],
                99: [2, 99],
                101: [2, 99],
                102: [2, 99],
                103: [2, 99],
                107: [2, 99],
                115: [2, 99],
                123: [2, 99],
                125: [2, 99],
                126: [2, 99],
                129: [2, 99],
                130: [2, 99],
                131: [2, 99],
                132: [2, 99],
                133: [2, 99],
                134: [2, 99]
              }, {
                1: [2, 76],
                6: [2, 76],
                25: [2, 76],
                26: [2, 76],
                38: [2, 76],
                47: [2, 76],
                52: [2, 76],
                55: [2, 76],
                64: [2, 76],
                65: [2, 76],
                66: [2, 76],
                68: [2, 76],
                70: [2, 76],
                71: [2, 76],
                75: [2, 76],
                77: [2, 76],
                81: [2, 76],
                82: [2, 76],
                83: [2, 76],
                88: [2, 76],
                90: [2, 76],
                99: [2, 76],
                101: [2, 76],
                102: [2, 76],
                103: [2, 76],
                107: [2, 76],
                115: [2, 76],
                123: [2, 76],
                125: [2, 76],
                126: [2, 76],
                127: [2, 76],
                128: [2, 76],
                129: [2, 76],
                130: [2, 76],
                131: [2, 76],
                132: [2, 76],
                133: [2, 76],
                134: [2, 76],
                135: [2, 76]
              }, {
                1: [2, 77],
                6: [2, 77],
                25: [2, 77],
                26: [2, 77],
                38: [2, 77],
                47: [2, 77],
                52: [2, 77],
                55: [2, 77],
                64: [2, 77],
                65: [2, 77],
                66: [2, 77],
                68: [2, 77],
                70: [2, 77],
                71: [2, 77],
                75: [2, 77],
                77: [2, 77],
                81: [2, 77],
                82: [2, 77],
                83: [2, 77],
                88: [2, 77],
                90: [2, 77],
                99: [2, 77],
                101: [2, 77],
                102: [2, 77],
                103: [2, 77],
                107: [2, 77],
                115: [2, 77],
                123: [2, 77],
                125: [2, 77],
                126: [2, 77],
                127: [2, 77],
                128: [2, 77],
                129: [2, 77],
                130: [2, 77],
                131: [2, 77],
                132: [2, 77],
                133: [2, 77],
                134: [2, 77],
                135: [2, 77]
              }, {
                1: [2, 78],
                6: [2, 78],
                25: [2, 78],
                26: [2, 78],
                38: [2, 78],
                47: [2, 78],
                52: [2, 78],
                55: [2, 78],
                64: [2, 78],
                65: [2, 78],
                66: [2, 78],
                68: [2, 78],
                70: [2, 78],
                71: [2, 78],
                75: [2, 78],
                77: [2, 78],
                81: [2, 78],
                82: [2, 78],
                83: [2, 78],
                88: [2, 78],
                90: [2, 78],
                99: [2, 78],
                101: [2, 78],
                102: [2, 78],
                103: [2, 78],
                107: [2, 78],
                115: [2, 78],
                123: [2, 78],
                125: [2, 78],
                126: [2, 78],
                127: [2, 78],
                128: [2, 78],
                129: [2, 78],
                130: [2, 78],
                131: [2, 78],
                132: [2, 78],
                133: [2, 78],
                134: [2, 78],
                135: [2, 78]
              }, {
                70: [1, 234]
              }, {
                55: [1, 189],
                70: [2, 83],
                89: 235,
                90: [1, 188],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                70: [2, 84]
              }, {
                8: 236,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                70: [2, 118],
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                12: [2, 112],
                28: [2, 112],
                30: [2, 112],
                31: [2, 112],
                33: [2, 112],
                34: [2, 112],
                35: [2, 112],
                36: [2, 112],
                43: [2, 112],
                44: [2, 112],
                45: [2, 112],
                49: [2, 112],
                50: [2, 112],
                70: [2, 112],
                73: [2, 112],
                76: [2, 112],
                80: [2, 112],
                85: [2, 112],
                86: [2, 112],
                87: [2, 112],
                93: [2, 112],
                97: [2, 112],
                98: [2, 112],
                101: [2, 112],
                103: [2, 112],
                105: [2, 112],
                107: [2, 112],
                116: [2, 112],
                122: [2, 112],
                124: [2, 112],
                125: [2, 112],
                126: [2, 112],
                127: [2, 112],
                128: [2, 112]
              }, {
                12: [2, 113],
                28: [2, 113],
                30: [2, 113],
                31: [2, 113],
                33: [2, 113],
                34: [2, 113],
                35: [2, 113],
                36: [2, 113],
                43: [2, 113],
                44: [2, 113],
                45: [2, 113],
                49: [2, 113],
                50: [2, 113],
                70: [2, 113],
                73: [2, 113],
                76: [2, 113],
                80: [2, 113],
                85: [2, 113],
                86: [2, 113],
                87: [2, 113],
                93: [2, 113],
                97: [2, 113],
                98: [2, 113],
                101: [2, 113],
                103: [2, 113],
                105: [2, 113],
                107: [2, 113],
                116: [2, 113],
                122: [2, 113],
                124: [2, 113],
                125: [2, 113],
                126: [2, 113],
                127: [2, 113],
                128: [2, 113]
              }, {
                1: [2, 82],
                6: [2, 82],
                25: [2, 82],
                26: [2, 82],
                38: [2, 82],
                47: [2, 82],
                52: [2, 82],
                55: [2, 82],
                64: [2, 82],
                65: [2, 82],
                66: [2, 82],
                68: [2, 82],
                70: [2, 82],
                71: [2, 82],
                75: [2, 82],
                77: [2, 82],
                81: [2, 82],
                82: [2, 82],
                83: [2, 82],
                88: [2, 82],
                90: [2, 82],
                99: [2, 82],
                101: [2, 82],
                102: [2, 82],
                103: [2, 82],
                107: [2, 82],
                115: [2, 82],
                123: [2, 82],
                125: [2, 82],
                126: [2, 82],
                127: [2, 82],
                128: [2, 82],
                129: [2, 82],
                130: [2, 82],
                131: [2, 82],
                132: [2, 82],
                133: [2, 82],
                134: [2, 82],
                135: [2, 82]
              }, {
                1: [2, 100],
                6: [2, 100],
                25: [2, 100],
                26: [2, 100],
                47: [2, 100],
                52: [2, 100],
                55: [2, 100],
                64: [2, 100],
                65: [2, 100],
                66: [2, 100],
                68: [2, 100],
                70: [2, 100],
                71: [2, 100],
                75: [2, 100],
                81: [2, 100],
                82: [2, 100],
                83: [2, 100],
                88: [2, 100],
                90: [2, 100],
                99: [2, 100],
                101: [2, 100],
                102: [2, 100],
                103: [2, 100],
                107: [2, 100],
                115: [2, 100],
                123: [2, 100],
                125: [2, 100],
                126: [2, 100],
                129: [2, 100],
                130: [2, 100],
                131: [2, 100],
                132: [2, 100],
                133: [2, 100],
                134: [2, 100]
              }, {
                1: [2, 34],
                6: [2, 34],
                25: [2, 34],
                26: [2, 34],
                47: [2, 34],
                52: [2, 34],
                55: [2, 34],
                70: [2, 34],
                75: [2, 34],
                83: [2, 34],
                88: [2, 34],
                90: [2, 34],
                99: [2, 34],
                100: 85,
                101: [2, 34],
                102: [2, 34],
                103: [2, 34],
                106: 86,
                107: [2, 34],
                108: 67,
                115: [2, 34],
                123: [2, 34],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                8: 237,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 238,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 105],
                6: [2, 105],
                25: [2, 105],
                26: [2, 105],
                47: [2, 105],
                52: [2, 105],
                55: [2, 105],
                64: [2, 105],
                65: [2, 105],
                66: [2, 105],
                68: [2, 105],
                70: [2, 105],
                71: [2, 105],
                75: [2, 105],
                81: [2, 105],
                82: [2, 105],
                83: [2, 105],
                88: [2, 105],
                90: [2, 105],
                99: [2, 105],
                101: [2, 105],
                102: [2, 105],
                103: [2, 105],
                107: [2, 105],
                115: [2, 105],
                123: [2, 105],
                125: [2, 105],
                126: [2, 105],
                129: [2, 105],
                130: [2, 105],
                131: [2, 105],
                132: [2, 105],
                133: [2, 105],
                134: [2, 105]
              }, {
                6: [2, 51],
                25: [2, 51],
                51: 239,
                52: [1, 222],
                83: [2, 51]
              }, {
                6: [2, 124],
                25: [2, 124],
                26: [2, 124],
                52: [2, 124],
                55: [1, 240],
                83: [2, 124],
                88: [2, 124],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                48: 241,
                49: [1, 58],
                50: [1, 59]
              }, {
                27: 107,
                28: [1, 71],
                42: 108,
                53: 242,
                54: 106,
                56: 109,
                57: 110,
                73: [1, 68],
                86: [1, 111],
                87: [1, 112]
              }, {
                47: [2, 57],
                52: [2, 57]
              }, {
                8: 243,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 194],
                6: [2, 194],
                25: [2, 194],
                26: [2, 194],
                47: [2, 194],
                52: [2, 194],
                55: [2, 194],
                70: [2, 194],
                75: [2, 194],
                83: [2, 194],
                88: [2, 194],
                90: [2, 194],
                99: [2, 194],
                100: 85,
                101: [2, 194],
                102: [2, 194],
                103: [2, 194],
                106: 86,
                107: [2, 194],
                108: 67,
                115: [2, 194],
                123: [2, 194],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                8: 244,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 196],
                6: [2, 196],
                25: [2, 196],
                26: [2, 196],
                47: [2, 196],
                52: [2, 196],
                55: [2, 196],
                70: [2, 196],
                75: [2, 196],
                83: [2, 196],
                88: [2, 196],
                90: [2, 196],
                99: [2, 196],
                100: 85,
                101: [2, 196],
                102: [2, 196],
                103: [2, 196],
                106: 86,
                107: [2, 196],
                108: 67,
                115: [2, 196],
                123: [2, 196],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 176],
                6: [2, 176],
                25: [2, 176],
                26: [2, 176],
                47: [2, 176],
                52: [2, 176],
                55: [2, 176],
                70: [2, 176],
                75: [2, 176],
                83: [2, 176],
                88: [2, 176],
                90: [2, 176],
                99: [2, 176],
                101: [2, 176],
                102: [2, 176],
                103: [2, 176],
                107: [2, 176],
                115: [2, 176],
                123: [2, 176],
                125: [2, 176],
                126: [2, 176],
                129: [2, 176],
                130: [2, 176],
                131: [2, 176],
                132: [2, 176],
                133: [2, 176],
                134: [2, 176]
              }, {
                8: 245,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 129],
                6: [2, 129],
                25: [2, 129],
                26: [2, 129],
                47: [2, 129],
                52: [2, 129],
                55: [2, 129],
                70: [2, 129],
                75: [2, 129],
                83: [2, 129],
                88: [2, 129],
                90: [2, 129],
                95: [1, 246],
                99: [2, 129],
                101: [2, 129],
                102: [2, 129],
                103: [2, 129],
                107: [2, 129],
                115: [2, 129],
                123: [2, 129],
                125: [2, 129],
                126: [2, 129],
                129: [2, 129],
                130: [2, 129],
                131: [2, 129],
                132: [2, 129],
                133: [2, 129],
                134: [2, 129]
              }, {
                5: 247,
                25: [1, 5]
              }, {
                27: 248,
                28: [1, 71]
              }, {
                117: 249,
                119: 212,
                120: [1, 213]
              }, {
                26: [1, 250],
                118: [1, 251],
                119: 252,
                120: [1, 213]
              }, {
                26: [2, 169],
                118: [2, 169],
                120: [2, 169]
              }, {
                8: 254,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                92: 253,
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 93],
                5: 255,
                6: [2, 93],
                25: [1, 5],
                26: [2, 93],
                47: [2, 93],
                52: [2, 93],
                55: [2, 93],
                70: [2, 93],
                75: [2, 93],
                83: [2, 93],
                88: [2, 93],
                90: [2, 93],
                99: [2, 93],
                100: 85,
                101: [1, 63],
                102: [2, 93],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                115: [2, 93],
                123: [2, 93],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 96],
                6: [2, 96],
                25: [2, 96],
                26: [2, 96],
                47: [2, 96],
                52: [2, 96],
                55: [2, 96],
                70: [2, 96],
                75: [2, 96],
                83: [2, 96],
                88: [2, 96],
                90: [2, 96],
                99: [2, 96],
                101: [2, 96],
                102: [2, 96],
                103: [2, 96],
                107: [2, 96],
                115: [2, 96],
                123: [2, 96],
                125: [2, 96],
                126: [2, 96],
                129: [2, 96],
                130: [2, 96],
                131: [2, 96],
                132: [2, 96],
                133: [2, 96],
                134: [2, 96]
              }, {
                8: 256,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 134],
                6: [2, 134],
                25: [2, 134],
                26: [2, 134],
                47: [2, 134],
                52: [2, 134],
                55: [2, 134],
                64: [2, 134],
                65: [2, 134],
                66: [2, 134],
                68: [2, 134],
                70: [2, 134],
                71: [2, 134],
                75: [2, 134],
                81: [2, 134],
                82: [2, 134],
                83: [2, 134],
                88: [2, 134],
                90: [2, 134],
                99: [2, 134],
                101: [2, 134],
                102: [2, 134],
                103: [2, 134],
                107: [2, 134],
                115: [2, 134],
                123: [2, 134],
                125: [2, 134],
                126: [2, 134],
                129: [2, 134],
                130: [2, 134],
                131: [2, 134],
                132: [2, 134],
                133: [2, 134],
                134: [2, 134]
              }, {
                6: [1, 72],
                26: [1, 257]
              }, {
                8: 258,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                6: [2, 63],
                12: [2, 113],
                25: [2, 63],
                28: [2, 113],
                30: [2, 113],
                31: [2, 113],
                33: [2, 113],
                34: [2, 113],
                35: [2, 113],
                36: [2, 113],
                43: [2, 113],
                44: [2, 113],
                45: [2, 113],
                49: [2, 113],
                50: [2, 113],
                52: [2, 63],
                73: [2, 113],
                76: [2, 113],
                80: [2, 113],
                85: [2, 113],
                86: [2, 113],
                87: [2, 113],
                88: [2, 63],
                93: [2, 113],
                97: [2, 113],
                98: [2, 113],
                101: [2, 113],
                103: [2, 113],
                105: [2, 113],
                107: [2, 113],
                116: [2, 113],
                122: [2, 113],
                124: [2, 113],
                125: [2, 113],
                126: [2, 113],
                127: [2, 113],
                128: [2, 113]
              }, {
                6: [1, 260],
                25: [1, 261],
                88: [1, 259]
              }, {
                6: [2, 52],
                8: 197,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [2, 52],
                26: [2, 52],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                58: 145,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                83: [2, 52],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                88: [2, 52],
                91: 262,
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                6: [2, 51],
                25: [2, 51],
                26: [2, 51],
                51: 263,
                52: [1, 222]
              }, {
                1: [2, 173],
                6: [2, 173],
                25: [2, 173],
                26: [2, 173],
                47: [2, 173],
                52: [2, 173],
                55: [2, 173],
                70: [2, 173],
                75: [2, 173],
                83: [2, 173],
                88: [2, 173],
                90: [2, 173],
                99: [2, 173],
                101: [2, 173],
                102: [2, 173],
                103: [2, 173],
                107: [2, 173],
                115: [2, 173],
                118: [2, 173],
                123: [2, 173],
                125: [2, 173],
                126: [2, 173],
                129: [2, 173],
                130: [2, 173],
                131: [2, 173],
                132: [2, 173],
                133: [2, 173],
                134: [2, 173]
              }, {
                8: 264,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 265,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                113: [2, 152],
                114: [2, 152]
              }, {
                27: 156,
                28: [1, 71],
                56: 157,
                57: 158,
                73: [1, 68],
                87: [1, 112],
                112: 266
              }, {
                1: [2, 158],
                6: [2, 158],
                25: [2, 158],
                26: [2, 158],
                47: [2, 158],
                52: [2, 158],
                55: [2, 158],
                70: [2, 158],
                75: [2, 158],
                83: [2, 158],
                88: [2, 158],
                90: [2, 158],
                99: [2, 158],
                100: 85,
                101: [2, 158],
                102: [1, 267],
                103: [2, 158],
                106: 86,
                107: [2, 158],
                108: 67,
                115: [1, 268],
                123: [2, 158],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 159],
                6: [2, 159],
                25: [2, 159],
                26: [2, 159],
                47: [2, 159],
                52: [2, 159],
                55: [2, 159],
                70: [2, 159],
                75: [2, 159],
                83: [2, 159],
                88: [2, 159],
                90: [2, 159],
                99: [2, 159],
                100: 85,
                101: [2, 159],
                102: [1, 269],
                103: [2, 159],
                106: 86,
                107: [2, 159],
                108: 67,
                115: [2, 159],
                123: [2, 159],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                6: [1, 271],
                25: [1, 272],
                75: [1, 270]
              }, {
                6: [2, 52],
                11: 165,
                25: [2, 52],
                26: [2, 52],
                27: 166,
                28: [1, 71],
                29: 167,
                30: [1, 69],
                31: [1, 70],
                39: 273,
                40: 164,
                42: 168,
                44: [1, 46],
                75: [2, 52],
                86: [1, 111]
              }, {
                8: 274,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 275],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 81],
                6: [2, 81],
                25: [2, 81],
                26: [2, 81],
                38: [2, 81],
                47: [2, 81],
                52: [2, 81],
                55: [2, 81],
                64: [2, 81],
                65: [2, 81],
                66: [2, 81],
                68: [2, 81],
                70: [2, 81],
                71: [2, 81],
                75: [2, 81],
                77: [2, 81],
                81: [2, 81],
                82: [2, 81],
                83: [2, 81],
                88: [2, 81],
                90: [2, 81],
                99: [2, 81],
                101: [2, 81],
                102: [2, 81],
                103: [2, 81],
                107: [2, 81],
                115: [2, 81],
                123: [2, 81],
                125: [2, 81],
                126: [2, 81],
                127: [2, 81],
                128: [2, 81],
                129: [2, 81],
                130: [2, 81],
                131: [2, 81],
                132: [2, 81],
                133: [2, 81],
                134: [2, 81],
                135: [2, 81]
              }, {
                8: 276,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                70: [2, 116],
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                70: [2, 117],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 35],
                6: [2, 35],
                25: [2, 35],
                26: [2, 35],
                47: [2, 35],
                52: [2, 35],
                55: [2, 35],
                70: [2, 35],
                75: [2, 35],
                83: [2, 35],
                88: [2, 35],
                90: [2, 35],
                99: [2, 35],
                100: 85,
                101: [2, 35],
                102: [2, 35],
                103: [2, 35],
                106: 86,
                107: [2, 35],
                108: 67,
                115: [2, 35],
                123: [2, 35],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                26: [1, 277],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                6: [1, 260],
                25: [1, 261],
                83: [1, 278]
              }, {
                6: [2, 63],
                25: [2, 63],
                26: [2, 63],
                52: [2, 63],
                83: [2, 63],
                88: [2, 63]
              }, {
                5: 279,
                25: [1, 5]
              }, {
                47: [2, 55],
                52: [2, 55]
              }, {
                47: [2, 58],
                52: [2, 58],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                26: [1, 280],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                5: 281,
                25: [1, 5],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                5: 282,
                25: [1, 5]
              }, {
                1: [2, 130],
                6: [2, 130],
                25: [2, 130],
                26: [2, 130],
                47: [2, 130],
                52: [2, 130],
                55: [2, 130],
                70: [2, 130],
                75: [2, 130],
                83: [2, 130],
                88: [2, 130],
                90: [2, 130],
                99: [2, 130],
                101: [2, 130],
                102: [2, 130],
                103: [2, 130],
                107: [2, 130],
                115: [2, 130],
                123: [2, 130],
                125: [2, 130],
                126: [2, 130],
                129: [2, 130],
                130: [2, 130],
                131: [2, 130],
                132: [2, 130],
                133: [2, 130],
                134: [2, 130]
              }, {
                5: 283,
                25: [1, 5]
              }, {
                26: [1, 284],
                118: [1, 285],
                119: 252,
                120: [1, 213]
              }, {
                1: [2, 167],
                6: [2, 167],
                25: [2, 167],
                26: [2, 167],
                47: [2, 167],
                52: [2, 167],
                55: [2, 167],
                70: [2, 167],
                75: [2, 167],
                83: [2, 167],
                88: [2, 167],
                90: [2, 167],
                99: [2, 167],
                101: [2, 167],
                102: [2, 167],
                103: [2, 167],
                107: [2, 167],
                115: [2, 167],
                123: [2, 167],
                125: [2, 167],
                126: [2, 167],
                129: [2, 167],
                130: [2, 167],
                131: [2, 167],
                132: [2, 167],
                133: [2, 167],
                134: [2, 167]
              }, {
                5: 286,
                25: [1, 5]
              }, {
                26: [2, 170],
                118: [2, 170],
                120: [2, 170]
              }, {
                5: 287,
                25: [1, 5],
                52: [1, 288]
              }, {
                25: [2, 126],
                52: [2, 126],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 94],
                6: [2, 94],
                25: [2, 94],
                26: [2, 94],
                47: [2, 94],
                52: [2, 94],
                55: [2, 94],
                70: [2, 94],
                75: [2, 94],
                83: [2, 94],
                88: [2, 94],
                90: [2, 94],
                99: [2, 94],
                101: [2, 94],
                102: [2, 94],
                103: [2, 94],
                107: [2, 94],
                115: [2, 94],
                123: [2, 94],
                125: [2, 94],
                126: [2, 94],
                129: [2, 94],
                130: [2, 94],
                131: [2, 94],
                132: [2, 94],
                133: [2, 94],
                134: [2, 94]
              }, {
                1: [2, 97],
                5: 289,
                6: [2, 97],
                25: [1, 5],
                26: [2, 97],
                47: [2, 97],
                52: [2, 97],
                55: [2, 97],
                70: [2, 97],
                75: [2, 97],
                83: [2, 97],
                88: [2, 97],
                90: [2, 97],
                99: [2, 97],
                100: 85,
                101: [1, 63],
                102: [2, 97],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                115: [2, 97],
                123: [2, 97],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                99: [1, 290]
              }, {
                88: [1, 291],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 111],
                6: [2, 111],
                25: [2, 111],
                26: [2, 111],
                38: [2, 111],
                47: [2, 111],
                52: [2, 111],
                55: [2, 111],
                64: [2, 111],
                65: [2, 111],
                66: [2, 111],
                68: [2, 111],
                70: [2, 111],
                71: [2, 111],
                75: [2, 111],
                81: [2, 111],
                82: [2, 111],
                83: [2, 111],
                88: [2, 111],
                90: [2, 111],
                99: [2, 111],
                101: [2, 111],
                102: [2, 111],
                103: [2, 111],
                107: [2, 111],
                113: [2, 111],
                114: [2, 111],
                115: [2, 111],
                123: [2, 111],
                125: [2, 111],
                126: [2, 111],
                129: [2, 111],
                130: [2, 111],
                131: [2, 111],
                132: [2, 111],
                133: [2, 111],
                134: [2, 111]
              }, {
                8: 197,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                58: 145,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                91: 292,
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 197,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                25: [1, 144],
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                58: 145,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                84: 293,
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                91: 143,
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                6: [2, 120],
                25: [2, 120],
                26: [2, 120],
                52: [2, 120],
                83: [2, 120],
                88: [2, 120]
              }, {
                6: [1, 260],
                25: [1, 261],
                26: [1, 294]
              }, {
                1: [2, 137],
                6: [2, 137],
                25: [2, 137],
                26: [2, 137],
                47: [2, 137],
                52: [2, 137],
                55: [2, 137],
                70: [2, 137],
                75: [2, 137],
                83: [2, 137],
                88: [2, 137],
                90: [2, 137],
                99: [2, 137],
                100: 85,
                101: [1, 63],
                102: [2, 137],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                115: [2, 137],
                123: [2, 137],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 139],
                6: [2, 139],
                25: [2, 139],
                26: [2, 139],
                47: [2, 139],
                52: [2, 139],
                55: [2, 139],
                70: [2, 139],
                75: [2, 139],
                83: [2, 139],
                88: [2, 139],
                90: [2, 139],
                99: [2, 139],
                100: 85,
                101: [1, 63],
                102: [2, 139],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                115: [2, 139],
                123: [2, 139],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                113: [2, 157],
                114: [2, 157]
              }, {
                8: 295,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 296,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 297,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 85],
                6: [2, 85],
                25: [2, 85],
                26: [2, 85],
                38: [2, 85],
                47: [2, 85],
                52: [2, 85],
                55: [2, 85],
                64: [2, 85],
                65: [2, 85],
                66: [2, 85],
                68: [2, 85],
                70: [2, 85],
                71: [2, 85],
                75: [2, 85],
                81: [2, 85],
                82: [2, 85],
                83: [2, 85],
                88: [2, 85],
                90: [2, 85],
                99: [2, 85],
                101: [2, 85],
                102: [2, 85],
                103: [2, 85],
                107: [2, 85],
                113: [2, 85],
                114: [2, 85],
                115: [2, 85],
                123: [2, 85],
                125: [2, 85],
                126: [2, 85],
                129: [2, 85],
                130: [2, 85],
                131: [2, 85],
                132: [2, 85],
                133: [2, 85],
                134: [2, 85]
              }, {
                11: 165,
                27: 166,
                28: [1, 71],
                29: 167,
                30: [1, 69],
                31: [1, 70],
                39: 298,
                40: 164,
                42: 168,
                44: [1, 46],
                86: [1, 111]
              }, {
                6: [2, 86],
                11: 165,
                25: [2, 86],
                26: [2, 86],
                27: 166,
                28: [1, 71],
                29: 167,
                30: [1, 69],
                31: [1, 70],
                39: 163,
                40: 164,
                42: 168,
                44: [1, 46],
                52: [2, 86],
                74: 299,
                86: [1, 111]
              }, {
                6: [2, 88],
                25: [2, 88],
                26: [2, 88],
                52: [2, 88],
                75: [2, 88]
              }, {
                6: [2, 38],
                25: [2, 38],
                26: [2, 38],
                52: [2, 38],
                75: [2, 38],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                8: 300,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                70: [2, 115],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 36],
                6: [2, 36],
                25: [2, 36],
                26: [2, 36],
                47: [2, 36],
                52: [2, 36],
                55: [2, 36],
                70: [2, 36],
                75: [2, 36],
                83: [2, 36],
                88: [2, 36],
                90: [2, 36],
                99: [2, 36],
                101: [2, 36],
                102: [2, 36],
                103: [2, 36],
                107: [2, 36],
                115: [2, 36],
                123: [2, 36],
                125: [2, 36],
                126: [2, 36],
                129: [2, 36],
                130: [2, 36],
                131: [2, 36],
                132: [2, 36],
                133: [2, 36],
                134: [2, 36]
              }, {
                1: [2, 106],
                6: [2, 106],
                25: [2, 106],
                26: [2, 106],
                47: [2, 106],
                52: [2, 106],
                55: [2, 106],
                64: [2, 106],
                65: [2, 106],
                66: [2, 106],
                68: [2, 106],
                70: [2, 106],
                71: [2, 106],
                75: [2, 106],
                81: [2, 106],
                82: [2, 106],
                83: [2, 106],
                88: [2, 106],
                90: [2, 106],
                99: [2, 106],
                101: [2, 106],
                102: [2, 106],
                103: [2, 106],
                107: [2, 106],
                115: [2, 106],
                123: [2, 106],
                125: [2, 106],
                126: [2, 106],
                129: [2, 106],
                130: [2, 106],
                131: [2, 106],
                132: [2, 106],
                133: [2, 106],
                134: [2, 106]
              }, {
                1: [2, 47],
                6: [2, 47],
                25: [2, 47],
                26: [2, 47],
                47: [2, 47],
                52: [2, 47],
                55: [2, 47],
                70: [2, 47],
                75: [2, 47],
                83: [2, 47],
                88: [2, 47],
                90: [2, 47],
                99: [2, 47],
                101: [2, 47],
                102: [2, 47],
                103: [2, 47],
                107: [2, 47],
                115: [2, 47],
                123: [2, 47],
                125: [2, 47],
                126: [2, 47],
                129: [2, 47],
                130: [2, 47],
                131: [2, 47],
                132: [2, 47],
                133: [2, 47],
                134: [2, 47]
              }, {
                1: [2, 195],
                6: [2, 195],
                25: [2, 195],
                26: [2, 195],
                47: [2, 195],
                52: [2, 195],
                55: [2, 195],
                70: [2, 195],
                75: [2, 195],
                83: [2, 195],
                88: [2, 195],
                90: [2, 195],
                99: [2, 195],
                101: [2, 195],
                102: [2, 195],
                103: [2, 195],
                107: [2, 195],
                115: [2, 195],
                123: [2, 195],
                125: [2, 195],
                126: [2, 195],
                129: [2, 195],
                130: [2, 195],
                131: [2, 195],
                132: [2, 195],
                133: [2, 195],
                134: [2, 195]
              }, {
                1: [2, 174],
                6: [2, 174],
                25: [2, 174],
                26: [2, 174],
                47: [2, 174],
                52: [2, 174],
                55: [2, 174],
                70: [2, 174],
                75: [2, 174],
                83: [2, 174],
                88: [2, 174],
                90: [2, 174],
                99: [2, 174],
                101: [2, 174],
                102: [2, 174],
                103: [2, 174],
                107: [2, 174],
                115: [2, 174],
                118: [2, 174],
                123: [2, 174],
                125: [2, 174],
                126: [2, 174],
                129: [2, 174],
                130: [2, 174],
                131: [2, 174],
                132: [2, 174],
                133: [2, 174],
                134: [2, 174]
              }, {
                1: [2, 131],
                6: [2, 131],
                25: [2, 131],
                26: [2, 131],
                47: [2, 131],
                52: [2, 131],
                55: [2, 131],
                70: [2, 131],
                75: [2, 131],
                83: [2, 131],
                88: [2, 131],
                90: [2, 131],
                99: [2, 131],
                101: [2, 131],
                102: [2, 131],
                103: [2, 131],
                107: [2, 131],
                115: [2, 131],
                123: [2, 131],
                125: [2, 131],
                126: [2, 131],
                129: [2, 131],
                130: [2, 131],
                131: [2, 131],
                132: [2, 131],
                133: [2, 131],
                134: [2, 131]
              }, {
                1: [2, 132],
                6: [2, 132],
                25: [2, 132],
                26: [2, 132],
                47: [2, 132],
                52: [2, 132],
                55: [2, 132],
                70: [2, 132],
                75: [2, 132],
                83: [2, 132],
                88: [2, 132],
                90: [2, 132],
                95: [2, 132],
                99: [2, 132],
                101: [2, 132],
                102: [2, 132],
                103: [2, 132],
                107: [2, 132],
                115: [2, 132],
                123: [2, 132],
                125: [2, 132],
                126: [2, 132],
                129: [2, 132],
                130: [2, 132],
                131: [2, 132],
                132: [2, 132],
                133: [2, 132],
                134: [2, 132]
              }, {
                1: [2, 165],
                6: [2, 165],
                25: [2, 165],
                26: [2, 165],
                47: [2, 165],
                52: [2, 165],
                55: [2, 165],
                70: [2, 165],
                75: [2, 165],
                83: [2, 165],
                88: [2, 165],
                90: [2, 165],
                99: [2, 165],
                101: [2, 165],
                102: [2, 165],
                103: [2, 165],
                107: [2, 165],
                115: [2, 165],
                123: [2, 165],
                125: [2, 165],
                126: [2, 165],
                129: [2, 165],
                130: [2, 165],
                131: [2, 165],
                132: [2, 165],
                133: [2, 165],
                134: [2, 165]
              }, {
                5: 301,
                25: [1, 5]
              }, {
                26: [1, 302]
              }, {
                6: [1, 303],
                26: [2, 171],
                118: [2, 171],
                120: [2, 171]
              }, {
                8: 304,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                1: [2, 98],
                6: [2, 98],
                25: [2, 98],
                26: [2, 98],
                47: [2, 98],
                52: [2, 98],
                55: [2, 98],
                70: [2, 98],
                75: [2, 98],
                83: [2, 98],
                88: [2, 98],
                90: [2, 98],
                99: [2, 98],
                101: [2, 98],
                102: [2, 98],
                103: [2, 98],
                107: [2, 98],
                115: [2, 98],
                123: [2, 98],
                125: [2, 98],
                126: [2, 98],
                129: [2, 98],
                130: [2, 98],
                131: [2, 98],
                132: [2, 98],
                133: [2, 98],
                134: [2, 98]
              }, {
                1: [2, 135],
                6: [2, 135],
                25: [2, 135],
                26: [2, 135],
                47: [2, 135],
                52: [2, 135],
                55: [2, 135],
                64: [2, 135],
                65: [2, 135],
                66: [2, 135],
                68: [2, 135],
                70: [2, 135],
                71: [2, 135],
                75: [2, 135],
                81: [2, 135],
                82: [2, 135],
                83: [2, 135],
                88: [2, 135],
                90: [2, 135],
                99: [2, 135],
                101: [2, 135],
                102: [2, 135],
                103: [2, 135],
                107: [2, 135],
                115: [2, 135],
                123: [2, 135],
                125: [2, 135],
                126: [2, 135],
                129: [2, 135],
                130: [2, 135],
                131: [2, 135],
                132: [2, 135],
                133: [2, 135],
                134: [2, 135]
              }, {
                1: [2, 114],
                6: [2, 114],
                25: [2, 114],
                26: [2, 114],
                47: [2, 114],
                52: [2, 114],
                55: [2, 114],
                64: [2, 114],
                65: [2, 114],
                66: [2, 114],
                68: [2, 114],
                70: [2, 114],
                71: [2, 114],
                75: [2, 114],
                81: [2, 114],
                82: [2, 114],
                83: [2, 114],
                88: [2, 114],
                90: [2, 114],
                99: [2, 114],
                101: [2, 114],
                102: [2, 114],
                103: [2, 114],
                107: [2, 114],
                115: [2, 114],
                123: [2, 114],
                125: [2, 114],
                126: [2, 114],
                129: [2, 114],
                130: [2, 114],
                131: [2, 114],
                132: [2, 114],
                133: [2, 114],
                134: [2, 114]
              }, {
                6: [2, 121],
                25: [2, 121],
                26: [2, 121],
                52: [2, 121],
                83: [2, 121],
                88: [2, 121]
              }, {
                6: [2, 51],
                25: [2, 51],
                26: [2, 51],
                51: 305,
                52: [1, 222]
              }, {
                6: [2, 122],
                25: [2, 122],
                26: [2, 122],
                52: [2, 122],
                83: [2, 122],
                88: [2, 122]
              }, {
                1: [2, 160],
                6: [2, 160],
                25: [2, 160],
                26: [2, 160],
                47: [2, 160],
                52: [2, 160],
                55: [2, 160],
                70: [2, 160],
                75: [2, 160],
                83: [2, 160],
                88: [2, 160],
                90: [2, 160],
                99: [2, 160],
                100: 85,
                101: [2, 160],
                102: [2, 160],
                103: [2, 160],
                106: 86,
                107: [2, 160],
                108: 67,
                115: [1, 306],
                123: [2, 160],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 162],
                6: [2, 162],
                25: [2, 162],
                26: [2, 162],
                47: [2, 162],
                52: [2, 162],
                55: [2, 162],
                70: [2, 162],
                75: [2, 162],
                83: [2, 162],
                88: [2, 162],
                90: [2, 162],
                99: [2, 162],
                100: 85,
                101: [2, 162],
                102: [1, 307],
                103: [2, 162],
                106: 86,
                107: [2, 162],
                108: 67,
                115: [2, 162],
                123: [2, 162],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 161],
                6: [2, 161],
                25: [2, 161],
                26: [2, 161],
                47: [2, 161],
                52: [2, 161],
                55: [2, 161],
                70: [2, 161],
                75: [2, 161],
                83: [2, 161],
                88: [2, 161],
                90: [2, 161],
                99: [2, 161],
                100: 85,
                101: [2, 161],
                102: [2, 161],
                103: [2, 161],
                106: 86,
                107: [2, 161],
                108: 67,
                115: [2, 161],
                123: [2, 161],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                6: [2, 89],
                25: [2, 89],
                26: [2, 89],
                52: [2, 89],
                75: [2, 89]
              }, {
                6: [2, 51],
                25: [2, 51],
                26: [2, 51],
                51: 308,
                52: [1, 232]
              }, {
                26: [1, 309],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                26: [1, 310]
              }, {
                1: [2, 168],
                6: [2, 168],
                25: [2, 168],
                26: [2, 168],
                47: [2, 168],
                52: [2, 168],
                55: [2, 168],
                70: [2, 168],
                75: [2, 168],
                83: [2, 168],
                88: [2, 168],
                90: [2, 168],
                99: [2, 168],
                101: [2, 168],
                102: [2, 168],
                103: [2, 168],
                107: [2, 168],
                115: [2, 168],
                123: [2, 168],
                125: [2, 168],
                126: [2, 168],
                129: [2, 168],
                130: [2, 168],
                131: [2, 168],
                132: [2, 168],
                133: [2, 168],
                134: [2, 168]
              }, {
                26: [2, 172],
                118: [2, 172],
                120: [2, 172]
              }, {
                25: [2, 127],
                52: [2, 127],
                100: 85,
                101: [1, 63],
                103: [1, 64],
                106: 86,
                107: [1, 66],
                108: 67,
                123: [1, 84],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                6: [1, 260],
                25: [1, 261],
                26: [1, 311]
              }, {
                8: 312,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                8: 313,
                9: 115,
                10: 20,
                11: 21,
                12: [1, 22],
                13: 8,
                14: 9,
                15: 10,
                16: 11,
                17: 12,
                18: 13,
                19: 14,
                20: 15,
                21: 16,
                22: 17,
                23: 18,
                24: 19,
                27: 60,
                28: [1, 71],
                29: 49,
                30: [1, 69],
                31: [1, 70],
                32: 24,
                33: [1, 50],
                34: [1, 51],
                35: [1, 52],
                36: [1, 53],
                37: 23,
                42: 61,
                43: [1, 45],
                44: [1, 46],
                45: [1, 29],
                48: 30,
                49: [1, 58],
                50: [1, 59],
                56: 47,
                57: 48,
                59: 36,
                61: 25,
                62: 26,
                63: 27,
                73: [1, 68],
                76: [1, 43],
                80: [1, 28],
                85: [1, 56],
                86: [1, 57],
                87: [1, 55],
                93: [1, 38],
                97: [1, 44],
                98: [1, 54],
                100: 39,
                101: [1, 63],
                103: [1, 64],
                104: 40,
                105: [1, 65],
                106: 41,
                107: [1, 66],
                108: 67,
                116: [1, 42],
                121: 37,
                122: [1, 62],
                124: [1, 31],
                125: [1, 32],
                126: [1, 33],
                127: [1, 34],
                128: [1, 35]
              }, {
                6: [1, 271],
                25: [1, 272],
                26: [1, 314]
              }, {
                6: [2, 39],
                25: [2, 39],
                26: [2, 39],
                52: [2, 39],
                75: [2, 39]
              }, {
                1: [2, 166],
                6: [2, 166],
                25: [2, 166],
                26: [2, 166],
                47: [2, 166],
                52: [2, 166],
                55: [2, 166],
                70: [2, 166],
                75: [2, 166],
                83: [2, 166],
                88: [2, 166],
                90: [2, 166],
                99: [2, 166],
                101: [2, 166],
                102: [2, 166],
                103: [2, 166],
                107: [2, 166],
                115: [2, 166],
                123: [2, 166],
                125: [2, 166],
                126: [2, 166],
                129: [2, 166],
                130: [2, 166],
                131: [2, 166],
                132: [2, 166],
                133: [2, 166],
                134: [2, 166]
              }, {
                6: [2, 123],
                25: [2, 123],
                26: [2, 123],
                52: [2, 123],
                83: [2, 123],
                88: [2, 123]
              }, {
                1: [2, 163],
                6: [2, 163],
                25: [2, 163],
                26: [2, 163],
                47: [2, 163],
                52: [2, 163],
                55: [2, 163],
                70: [2, 163],
                75: [2, 163],
                83: [2, 163],
                88: [2, 163],
                90: [2, 163],
                99: [2, 163],
                100: 85,
                101: [2, 163],
                102: [2, 163],
                103: [2, 163],
                106: 86,
                107: [2, 163],
                108: 67,
                115: [2, 163],
                123: [2, 163],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                1: [2, 164],
                6: [2, 164],
                25: [2, 164],
                26: [2, 164],
                47: [2, 164],
                52: [2, 164],
                55: [2, 164],
                70: [2, 164],
                75: [2, 164],
                83: [2, 164],
                88: [2, 164],
                90: [2, 164],
                99: [2, 164],
                100: 85,
                101: [2, 164],
                102: [2, 164],
                103: [2, 164],
                106: 86,
                107: [2, 164],
                108: 67,
                115: [2, 164],
                123: [2, 164],
                125: [1, 78],
                126: [1, 77],
                129: [1, 76],
                130: [1, 79],
                131: [1, 80],
                132: [1, 81],
                133: [1, 82],
                134: [1, 83]
              }, {
                6: [2, 90],
                25: [2, 90],
                26: [2, 90],
                52: [2, 90],
                75: [2, 90]
              }],
              defaultActions: {
                58: [2, 49],
                59: [2, 50],
                73: [2, 3],
                92: [2, 104],
                186: [2, 84]
              },
              parseError: function(b, c) {
                throw new Error(b)
              },
              parse: function(b) {
                function p() {
                  var a;
                  a = c.lexer.lex() || 1, typeof a != "number" && (a = c.symbols_[a] || a);
                  return a
                }
                function o(a) {
                  d.length = d.length - 2 * a, e.length = e.length - a, f.length = f.length - a
                }
                var c = this,
                  d = [0],
                  e = [null],
                  f = [],
                  g = this.table,
                  h = "",
                  i = 0,
                  j = 0,
                  k = 0,
                  l = 2,
                  m = 1;
                this.lexer.setInput(b), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
                var n = this.lexer.yylloc;
                f.push(n), typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
                var q, r, s, t, u, v, w = {},
                  x, y, z, A;
                for (;;) {
                  s = d[d.length - 1], this.defaultActions[s] ? t = this.defaultActions[s] : (q == null && (q = p()), t = g[s] && g[s][q]);
                  if (typeof t == "undefined" || !t.length || !t[0]) if (!k) {
                    A = [];
                    for (x in g[s]) this.terminals_[x] && x > 2 && A.push("'" + this.terminals_[x] + "'");
                    var B = "";
                    this.lexer.showPosition ? B = "Parse error on line " + (i + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + A.join(", ") + ", got '" + this.terminals_[q] + "'" : B = "Parse error on line " + (i + 1) + ": Unexpected " + (q == 1 ? "end of input" : "'" + (this.terminals_[q] || q) + "'"), this.parseError(B, {
                      text: this.lexer.match,
                      token: this.terminals_[q] || q,
                      line: this.lexer.yylineno,
                      loc: n,
                      expected: A
                    })
                  }
                  if (t[0] instanceof Array && t.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + s + ", token: " + q);
                  switch (t[0]) {
                  case 1:
                    d.push(q), e.push(this.lexer.yytext), f.push(this.lexer.yylloc), d.push(t[1]), q = null, r ? (q = r, r = null) : (j = this.lexer.yyleng, h = this.lexer.yytext, i = this.lexer.yylineno, n = this.lexer.yylloc, k > 0 && k--);
                    break;
                  case 2:
                    y = this.productions_[t[1]][1], w.$ = e[e.length - y], w._$ = {
                      first_line: f[f.length - (y || 1)].first_line,
                      last_line: f[f.length - 1].last_line,
                      first_column: f[f.length - (y || 1)].first_column,
                      last_column: f[f.length - 1].last_column
                    }, v = this.performAction.call(w, h, j, i, this.yy, t[1], e, f);
                    if (typeof v != "undefined") return v;
                    y && (d = d.slice(0, -1 * y * 2), e = e.slice(0, -1 * y), f = f.slice(0, -1 * y)), d.push(this.productions_[t[1]][0]), e.push(w.$), f.push(w._$), z = g[d[d.length - 2]][d[d.length - 1]], d.push(z);
                    break;
                  case 3:
                    return !0
                  }
                }
                return !0
              }
            };
            return a
          }();
        typeof require != "undefined" && typeof a != "undefined" && (a.parser = b, a.parse = function() {
          return b.parse.apply(b, arguments)
        }, a.main = function(c) {
          if (!c[1]) throw new Error("Usage: " + c[0] + " FILE");
          if (typeof process != "undefined") var d = require("fs").readFileSync(require("path").join(process.cwd(), c[1]), "utf8");
          else var e = require("file").path(require("file").cwd()),
            d = e.join(c[1]).read({
              charset: "utf-8"
            });
          return a.parser.parse(d)
        }, typeof module != "undefined" && require.main === module && a.main(typeof process != "undefined" ? process.argv.slice(1) : require("system").args))
      }, require["./scope"] = new function() {
        var a = this;
        (function() {
          var b, c, d, e;
          e = require("./helpers"), c = e.extend, d = e.last, a.Scope = b = function() {
            function a(b, c, d) {
              this.parent = b, this.expressions = c, this.method = d, this.variables = [{
                name: "arguments",
                type: "arguments"
              }], this.positions = {}, this.parent || (a.root = this)
            }
            a.name = "Scope", a.root = null, a.prototype.add = function(a, b, c) {
              if (this.shared && !c) return this.parent.add(a, b, c);
              return Object.prototype.hasOwnProperty.call(this.positions, a) ? this.variables[this.positions[a]].type = b : this.positions[a] = this.variables.push({
                name: a,
                type: b
              }) - 1
            }, a.prototype.find = function(a, b) {
              if (this.check(a, b)) return !0;
              this.add(a, "var");
              return !1
            }, a.prototype.parameter = function(a) {
              if (!this.shared || !this.parent.check(a, !0)) return this.add(a, "param")
            }, a.prototype.check = function(a, b) {
              var c, d;
              c = !! this.type(a);
              if (c || b) return c;
              return (d = this.parent) != null ? !! d.check(a) : !! void 0
            }, a.prototype.temporary = function(a, b) {
              return a.length > 1 ? "_" + a + (b > 1 ? b - 1 : "") : "_" + (b + parseInt(a, 36)).toString(36).replace(/\d/g, "a")
            }, a.prototype.type = function(a) {
              var b, c, d, e;
              e = this.variables;
              for (c = 0, d = e.length; c < d; c++) {
                b = e[c];
                if (b.name === a) return b.type
              }
              return null
            }, a.prototype.freeVariable = function(a, b) {
              var c, d;
              b == null && (b = !0), c = 0;
              while (this.check(d = this.temporary(a, c))) c++;
              b && this.add(d, "var", !0);
              return d
            }, a.prototype.assign = function(a, b) {
              this.add(a, {
                value: b,
                assigned: !0
              }, !0);
              return this.hasAssignments = !0
            }, a.prototype.hasDeclarations = function() {
              return !!this.declaredVariables().length
            }, a.prototype.declaredVariables = function() {
              var a, b, c, d, e, f;
              a = [], b = [], f = this.variables;
              for (d = 0, e = f.length; d < e; d++) c = f[d], c.type === "var" && (c.name.charAt(0) === "_" ? b : a).push(c.name);
              return a.sort().concat(b.sort())
            }, a.prototype.assignedVariables = function() {
              var a, b, c, d, e;
              d = this.variables, e = [];
              for (b = 0, c = d.length; b < c; b++) a = d[b], a.type.assigned && e.push("" + a.name + " = " + a.type.value);
              return e
            };
            return a
          }()
        }).call(this)
      }, require["./nodes"] = new function() {
        var a = this;
        (function() {
          var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ba, bb, bc, bd, be, bf, bg, bh, bi, bj, bk = {}.hasOwnProperty,
            bl = function(a, b) {
              function d() {
                this.constructor = a
              }
              for (var c in b) bk.call(b, c) && (a[c] = b[c]);
              d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype;
              return a
            },
            bm = [].indexOf ||
          function(a) {
            for (var b = 0, c = this.length; b < c; b++) if (b in this && this[b] === a) return b;
            return -1
          };
          N = require("./scope").Scope, bi = require("./lexer"), I = bi.RESERVED, M = bi.STRICT_PROSCRIBED, bj = require("./helpers"), Z = bj.compact, bb = bj.flatten, ba = bj.extend, bd = bj.merge, $ = bj.del, bf = bj.starts, _ = bj.ends, bc = bj.last, a.extend = ba, Y = function() {
            return !0
          }, D = function() {
            return !1
          }, S = function() {
            return this
          }, C = function() {
            this.negated = !this.negated;
            return this
          }, a.Base = e = function() {
            function a() {}
            a.name = "Base", a.prototype.compile = function(a, b) {
              var c;
              a = ba({}, a), b && (a.level = b), c = this.unfoldSoak(a) || this, c.tab = a.indent;
              return a.level === z || !c.isStatement(a) ? c.compileNode(a) : c.compileClosure(a)
            }, a.prototype.compileClosure = function(a) {
              if (this.jumps()) throw SyntaxError("cannot use a pure statement in an expression.");
              a.sharedScope = !0;
              return i.wrap(this).compileNode(a)
            }, a.prototype.cache = function(a, b, c) {
              var e, f;
              if (!this.isComplex()) {
                e = b ? this.compile(a, b) : this;
                return [e, e]
              }
              e = new A(c || a.scope.freeVariable("ref")), f = new d(e, this);
              return b ? [f.compile(a, b), e.value] : [f, e]
            }, a.prototype.compileLoopReference = function(a, b) {
              var c, d;
              c = d = this.compile(a, w), -Infinity < +c && +c < Infinity || o.test(c) && a.scope.check(c, !0) || (c = "" + (d = a.scope.freeVariable(b)) + " = " + c);
              return [c, d]
            }, a.prototype.makeReturn = function(a) {
              var b;
              b = this.unwrapAll();
              return a ? new g(new A("" + a + ".push"), [b]) : new K(b)
            }, a.prototype.contains = function(a) {
              var b;
              b = !1, this.traverseChildren(!1, function(c) {
                if (a(c)) {
                  b = !0;
                  return !1
                }
              });
              return b
            }, a.prototype.containsType = function(a) {
              return this instanceof a || this.contains(function(b) {
                return b instanceof a
              })
            }, a.prototype.lastNonComment = function(a) {
              var b;
              b = a.length;
              while (b--) if (!(a[b] instanceof k)) return a[b];
              return null
            }, a.prototype.toString = function(a, b) {
              var c;
              a == null && (a = ""), b == null && (b = this.constructor.name), c = "\n" + a + b, this.soak && (c += "?"), this.eachChild(function(b) {
                return c += b.toString(a + R)
              });
              return c
            }, a.prototype.eachChild = function(a) {
              var b, c, d, e, f, g, h, i;
              if (!this.children) return this;
              h = this.children;
              for (d = 0, f = h.length; d < f; d++) {
                b = h[d];
                if (this[b]) {
                  i = bb([this[b]]);
                  for (e = 0, g = i.length; e < g; e++) {
                    c = i[e];
                    if (a(c) === !1) return this
                  }
                }
              }
              return this
            }, a.prototype.traverseChildren = function(a, b) {
              return this.eachChild(function(c) {
                if (b(c) === !1) return !1;
                return c.traverseChildren(a, b)
              })
            }, a.prototype.invert = function() {
              return new F("!", this)
            }, a.prototype.unwrapAll = function() {
              var a;
              a = this;
              while (a !== (a = a.unwrap())) continue;
              return a
            }, a.prototype.children = [], a.prototype.isStatement = D, a.prototype.jumps = D, a.prototype.isComplex = Y, a.prototype.isChainable = D, a.prototype.isAssignable = D, a.prototype.unwrap = S, a.prototype.unfoldSoak = D, a.prototype.assigns = D;
            return a
          }(), a.Block = f = function(a) {
            function b(a) {
              this.expressions = Z(bb(a || []))
            }
            bl(b, a), b.name = "Block", b.prototype.children = ["expressions"], b.prototype.push = function(a) {
              this.expressions.push(a);
              return this
            }, b.prototype.pop = function() {
              return this.expressions.pop()
            }, b.prototype.unshift = function(a) {
              this.expressions.unshift(a);
              return this
            }, b.prototype.unwrap = function() {
              return this.expressions.length === 1 ? this.expressions[0] : this
            }, b.prototype.isEmpty = function() {
              return !this.expressions.length
            }, b.prototype.isStatement = function(a) {
              var b, c, d, e;
              e = this.expressions;
              for (c = 0, d = e.length; c < d; c++) {
                b = e[c];
                if (b.isStatement(a)) return !0
              }
              return !1
            }, b.prototype.jumps = function(a) {
              var b, c, d, e;
              e = this.expressions;
              for (c = 0, d = e.length; c < d; c++) {
                b = e[c];
                if (b.jumps(a)) return b
              }
            }, b.prototype.makeReturn = function(a) {
              var b, c;
              c = this.expressions.length;
              while (c--) {
                b = this.expressions[c];
                if (!(b instanceof k)) {
                  this.expressions[c] = b.makeReturn(a), b instanceof K && !b.expression && this.expressions.splice(c, 1);
                  break
                }
              }
              return this
            }, b.prototype.compile = function(a, c) {
              a == null && (a = {});
              return a.scope ? b.__super__.compile.call(this, a, c) : this.compileRoot(a)
            }, b.prototype.compileNode = function(a) {
              var c, d, e, f, g, h, i;
              this.tab = a.indent, f = a.level === z, d = [], i = this.expressions;
              for (g = 0, h = i.length; g < h; g++) e = i[g], e = e.unwrapAll(), e = e.unfoldSoak(a) || e, e instanceof b ? d.push(e.compileNode(a)) : f ? (e.front = !0, c = e.compile(a), e.isStatement(a) || (c = "" + this.tab + c + ";", e instanceof A && (c = "" + c + "\n")), d.push(c)) : d.push(e.compile(a, w));
              if (f) return this.spaced ? "\n" + d.join("\n\n") + "\n" : d.join("\n");
              c = d.join(", ") || "void 0";
              return d.length > 1 && a.level >= w ? "(" + c + ")" : c
            }, b.prototype.compileRoot = function(a) {
              var b, c, d, e, f, g;
              a.indent = a.bare ? "" : R, a.scope = new N(null, this, null), a.level = z, this.spaced = !0, e = "", a.bare || (f = function() {
                var a, b, e, f;
                e = this.expressions, f = [];
                for (d = a = 0, b = e.length; a < b; d = ++a) {
                  c = e[d];
                  if (!(c.unwrap() instanceof k)) break;
                  f.push(c)
                }
                return f
              }.call(this), g = this.expressions.slice(f.length), this.expressions = f, f.length && (e = "" + this.compileNode(bd(a, {
                indent: ""
              })) + "\n"), this.expressions = g), b = this.compileWithDeclarations(a);
              if (a.bare) return b;
              return "" + e + "(function() {\n" + b + "\n}).call(this);\n"
            }, b.prototype.compileWithDeclarations = function(a) {
              var b, c, d, e, f, g, h, i, j, l, m, n, o, p;
              c = g = "", n = this.expressions;
              for (f = l = 0, m = n.length; l < m; f = ++l) {
                e = n[f], e = e.unwrap();
                if (!(e instanceof k || e instanceof A)) break
              }
              a = bd(a, {
                level: z
              }), f && (h = this.expressions.splice(f, 9e9), o = [this.spaced, !1], j = o[0], this.spaced = o[1], p = [this.compileNode(a), j], c = p[0], this.spaced = p[1], this.expressions = h), g = this.compileNode(a), i = a.scope;
              if (i.expressions === this) {
                d = a.scope.hasDeclarations(), b = i.hasAssignments;
                if (d || b) f && (c += "\n"), c += "" + this.tab + "var ", d && (c += i.declaredVariables().join(", ")), b && (d && (c += ",\n" + (this.tab + R)), c += i.assignedVariables().join(",\n" + (this.tab + R))), c += ";\n"
              }
              return c + g
            }, b.wrap = function(a) {
              if (a.length === 1 && a[0] instanceof b) return a[0];
              return new b(a)
            };
            return b
          }(e), a.Literal = A = function(a) {
            function b(a) {
              this.value = a
            }
            bl(b, a), b.name = "Literal", b.prototype.makeReturn = function() {
              return this.isStatement() ? this : b.__super__.makeReturn.apply(this, arguments)
            }, b.prototype.isAssignable = function() {
              return o.test(this.value)
            }, b.prototype.isStatement = function() {
              var a;
              return (a = this.value) === "break" || a === "continue" || a === "debugger"
            }, b.prototype.isComplex = D, b.prototype.assigns = function(a) {
              return a === this.value
            }, b.prototype.jumps = function(a) {
              if (this.value === "break" && !((a != null ? a.loop : void 0) || (a != null ? a.block : void 0))) return this;
              if (this.value === "continue" && (a != null ? !a.loop : !void 0)) return this
            }, b.prototype.compileNode = function(a) {
              var b, c;
              b = this.isUndefined ? a.level >= u ? "(void 0)" : "void 0" : this.value === "this" ? ((c = a.scope.method) != null ? c.bound : void 0) ? a.scope.method.context : this.value : this.value.reserved ? '"' + this.value + '"' : this.value;
              return this.isStatement() ? "" + this.tab + b + ";" : b
            }, b.prototype.toString = function() {
              return ' "' + this.value + '"'
            };
            return b
          }(e), a.Return = K = function(a) {
            function b(a) {
              a && !a.unwrap().isUndefined && (this.expression = a)
            }
            bl(b, a), b.name = "Return", b.prototype.children = ["expression"], b.prototype.isStatement = Y, b.prototype.makeReturn = S, b.prototype.jumps = S, b.prototype.compile = function(a, c) {
              var d, e;
              d = (e = this.expression) != null ? e.makeReturn() : void 0;
              return !d || d instanceof b ? b.__super__.compile.call(this, a, c) : d.compile(a, c)
            }, b.prototype.compileNode = function(a) {
              return this.tab + ("return" + [this.expression ? " " + this.expression.compile(a, y) : void 0] + ";")
            };
            return b
          }(e), a.Value = W = function(a) {
            function b(a, c, d) {
              if (!c && a instanceof b) return a;
              this.base = a, this.properties = c || [], d && (this[d] = !0);
              return this
            }
            bl(b, a), b.name = "Value", b.prototype.children = ["base", "properties"], b.prototype.add = function(a) {
              this.properties = this.properties.concat(a);
              return this
            }, b.prototype.hasProperties = function() {
              return !!this.properties.length
            }, b.prototype.isArray = function() {
              return !this.properties.length && this.base instanceof c
            }, b.prototype.isComplex = function() {
              return this.hasProperties() || this.base.isComplex()
            }, b.prototype.isAssignable = function() {
              return this.hasProperties() || this.base.isAssignable()
            }, b.prototype.isSimpleNumber = function() {
              return this.base instanceof A && L.test(this.base.value)
            }, b.prototype.isString = function() {
              return this.base instanceof A && q.test(this.base.value)
            }, b.prototype.isAtomic = function() {
              var a, b, c, d;
              d = this.properties.concat(this.base);
              for (b = 0, c = d.length; b < c; b++) {
                a = d[b];
                if (a.soak || a instanceof g) return !1
              }
              return !0
            }, b.prototype.isStatement = function(a) {
              return !this.properties.length && this.base.isStatement(a)
            }, b.prototype.assigns = function(a) {
              return !this.properties.length && this.base.assigns(a)
            }, b.prototype.jumps = function(a) {
              return !this.properties.length && this.base.jumps(a)
            }, b.prototype.isObject = function(a) {
              if (this.properties.length) return !1;
              return this.base instanceof E && (!a || this.base.generated)
            }, b.prototype.isSplice = function() {
              return bc(this.properties) instanceof O
            }, b.prototype.unwrap = function() {
              return this.properties.length ? this : this.base
            }, b.prototype.cacheReference = function(a) {
              var c, e, f, g;
              f = bc(this.properties);
              if (this.properties.length < 2 && !this.base.isComplex() && (f != null ? !f.isComplex() : !void 0)) return [this, this];
              c = new b(this.base, this.properties.slice(0, -1)), c.isComplex() && (e = new A(a.scope.freeVariable("base")), c = new b(new H(new d(e, c))));
              if (!f) return [c, e];
              f.isComplex() && (g = new A(a.scope.freeVariable("name")), f = new t(new d(g, f.index)), g = new t(g));
              return [c.add(f), new b(e || c.base, [g || f])]
            }, b.prototype.compileNode = function(a) {
              var b, c, d, e, f;
              this.base.front = this.front, d = this.properties, b = this.base.compile(a, d.length ? u : null), (this.base instanceof H || d.length) && L.test(b) && (b = "" + b + ".");
              for (e = 0, f = d.length; e < f; e++) c = d[e], b += c.compile(a);
              return b
            }, b.prototype.unfoldSoak = function(a) {
              var c, e = this;
              if (this.unfoldedSoak != null) return this.unfoldedSoak;
              c = function() {
                var c, f, g, h, i, j, k, m, n;
                if (g = e.base.unfoldSoak(a)) {
                  Array.prototype.push.apply(g.body.properties, e.properties);
                  return g
                }
                n = e.properties;
                for (f = k = 0, m = n.length; k < m; f = ++k) {
                  h = n[f];
                  if (!h.soak) continue;
                  h.soak = !1, c = new b(e.base, e.properties.slice(0, f)), j = new b(e.base, e.properties.slice(f)), c.isComplex() && (i = new A(a.scope.freeVariable("ref")), c = new H(new d(i, c)), j.base = i);
                  return new r(new l(c), j, {
                    soak: !0
                  })
                }
                return null
              }();
              return this.unfoldedSoak = c || !1
            };
            return b
          }(e), a.Comment = k = function(a) {
            function b(a) {
              this.comment = a
            }
            bl(b, a), b.name = "Comment", b.prototype.isStatement = Y, b.prototype.makeReturn = S, b.prototype.compileNode = function(a, b) {
              var c;
              c = "/*" + be(this.comment, this.tab) + ("\n" + this.tab + "*/\n"), (b || a.level) === z && (c = a.indent + c);
              return c
            };
            return b
          }(e), a.Call = g = function(a) {
            function c(a, b, c) {
              this.args = b != null ? b : [], this.soak = c, this.isNew = !1, this.isSuper = a === "super", this.variable = this.isSuper ? null : a
            }
            bl(c, a), c.name = "Call", c.prototype.children = ["variable", "args"], c.prototype.newInstance = function() {
              var a, b;
              a = ((b = this.variable) != null ? b.base : void 0) || this.variable, a instanceof c && !a.isNew ? a.newInstance() : this.isNew = !0;
              return this
            }, c.prototype.superReference = function(a) {
              var c, d, e;
              d = a.scope.method;
              if (!d) throw SyntaxError("cannot call super outside of a function.");
              e = d.name;
              if (e == null) throw SyntaxError("cannot call super on an anonymous function.");
              if (d.klass) {
                c = [new b(new A("__super__"))], d["static"] && c.push(new b(new A("constructor"))), c.push(new b(new A(e)));
                return (new W(new A(d.klass), c)).compile(a)
              }
              return "" + e + ".__super__.constructor"
            }, c.prototype.unfoldSoak = function(a) {
              var b, d, e, f, g, h, i, j, k;
              if (this.soak) {
                if (this.variable) {
                  if (d = bg(a, this, "variable")) return d;
                  j = (new W(this.variable)).cacheReference(a), e = j[0], g = j[1]
                } else e = new A(this.superReference(a)), g = new W(e);
                g = new c(g, this.args), g.isNew = this.isNew, e = new A("typeof " + e.compile(a) + ' === "function"');
                return new r(e, new W(g), {
                  soak: !0
                })
              }
              b = this, f = [];
              for (;;) {
                if (b.variable instanceof c) {
                  f.push(b), b = b.variable;
                  continue
                }
                if (!(b.variable instanceof W)) break;
                f.push(b);
                if (!((b = b.variable.base) instanceof c)) break
              }
              k = f.reverse();
              for (h = 0, i = k.length; h < i; h++) b = k[h], d && (b.variable instanceof c ? b.variable = d : b.variable.base = d), d = bg(a, b, "variable");
              return d
            }, c.prototype.filterImplicitObjects = function(a) {
              var b, c, e, f, g, h, i, j, l, m;
              c = [];
              for (h = 0, j = a.length; h < j; h++) {
                b = a[h];
                if (!((typeof b.isObject == "function" ? b.isObject() : void 0) && b.base.generated)) {
                  c.push(b);
                  continue
                }
                e = null, m = b.base.properties;
                for (i = 0, l = m.length; i < l; i++) f = m[i], f instanceof d || f instanceof k ? (e || c.push(e = new E(g = [], !0)), g.push(f)) : (c.push(f), e = null)
              }
              return c
            }, c.prototype.compileNode = function(a) {
              var b, c, d, e;
              (e = this.variable) != null && (e.front = this.front);
              if (d = P.compileSplattedArray(a, this.args, !0)) return this.compileSplat(a, d);
              c = this.filterImplicitObjects(this.args), c = function() {
                var d, e, f;
                f = [];
                for (d = 0, e = c.length; d < e; d++) b = c[d], f.push(b.compile(a, w));
                return f
              }().join(", ");
              return this.isSuper ? this.superReference(a) + (".call(this" + (c && ", " + c) + ")") : (this.isNew ? "new " : "") + this.variable.compile(a, u) + ("(" + c + ")")
            }, c.prototype.compileSuper = function(a, b) {
              return "" + this.superReference(b) + ".call(this" + (a.length ? ", " : "") + a + ")"
            }, c.prototype.compileSplat = function(a, b) {
              var c, d, e, f, g;
              if (this.isSuper) return "" + this.superReference(a) + ".apply(this, " + b + ")";
              if (this.isNew) {
                e = this.tab + R;
                return "(function(func, args, ctor) {\n" + e + "ctor.prototype = func.prototype;\n" + e + "var child = new ctor, result = func.apply(child, args);\n" + e + 'return typeof result === "object" ? result : child;\n' + this.tab + "})(" + this.variable.compile(a, w) + ", " + b + ", function() {})"
              }
              c = new W(this.variable), (f = c.properties.pop()) && c.isComplex() ? (g = a.scope.freeVariable("ref"), d = "(" + g + " = " + c.compile(a, w) + ")" + f.compile(a)) : (d = c.compile(a, u), L.test(d) && (d = "(" + d + ")"), f ? (g = d, d += f.compile(a)) : g = "null");
              return "" + d + ".apply(" + g + ", " + b + ")"
            };
            return c
          }(e), a.Extends = m = function(a) {
            function b(a, b) {
              this.child = a, this.parent = b
            }
            bl(b, a), b.name = "Extends", b.prototype.children = ["child", "parent"], b.prototype.compile = function(a) {
              return (new g(new W(new A(bh("extends"))), [this.child, this.parent])).compile(a)
            };
            return b
          }(e), a.Access = b = function(a) {
            function b(a, b) {
              this.name = a, this.name.asKey = !0, this.soak = b === "soak"
            }
            bl(b, a), b.name = "Access", b.prototype.children = ["name"], b.prototype.compile = function(a) {
              var b;
              b = this.name.compile(a);
              return o.test(b) ? "." + b : "[" + b + "]"
            }, b.prototype.isComplex = D;
            return b
          }(e), a.Index = t = function(a) {
            function b(a) {
              this.index = a
            }
            bl(b, a), b.name = "Index", b.prototype.children = ["index"], b.prototype.compile = function(a) {
              return "[" + this.index.compile(a, y) + "]"
            }, b.prototype.isComplex = function() {
              return this.index.isComplex()
            };
            return b
          }(e), a.Range = J = function(a) {
            function b(a, b, c) {
              this.from = a, this.to = b, this.exclusive = c === "exclusive", this.equals = this.exclusive ? "" : "="
            }
            bl(b, a), b.name = "Range", b.prototype.children = ["from", "to"], b.prototype.compileVariables = function(a) {
              var b, c, d, e, f;
              a = bd(a, {
                top: !0
              }), c = this.from.cache(a, w), this.fromC = c[0], this.fromVar = c[1], d = this.to.cache(a, w), this.toC = d[0], this.toVar = d[1];
              if (b = $(a, "step")) e = b.cache(a, w), this.step = e[0], this.stepVar = e[1];
              f = [this.fromVar.match(L), this.toVar.match(L)], this.fromNum = f[0], this.toNum = f[1];
              if (this.stepVar) return this.stepNum = this.stepVar.match(L)
            }, b.prototype.compileNode = function(a) {
              var b, c, d, e, f, g, h, i, j, k, l, m, n, o;
              this.fromVar || this.compileVariables(a);
              if (!a.index) return this.compileArray(a);
              h = this.fromNum && this.toNum, f = $(a, "index"), g = $(a, "name"), j = g && g !== f, m = "" + f + " = " + this.fromC, this.toC !== this.toVar && (m += ", " + this.toC), this.step !== this.stepVar && (m += ", " + this.step), n = ["" + f + " <" + this.equals, "" + f + " >" + this.equals], i = n[0], e = n[1], c = this.stepNum ? +this.stepNum > 0 ? "" + i + " " + this.toVar : "" + e + " " + this.toVar : h ? (o = [+this.fromNum, +this.toNum], d = o[0], l = o[1], o, d <= l ? "" + i + " " + l : "" + e + " " + l) : (b = "" + this.fromVar + " <= " + this.toVar, "" + b + " ? " + i + " " + this.toVar + " : " + e + " " + this.toVar), k = this.stepVar ? "" + f + " += " + this.stepVar : h ? j ? d <= l ? "++" + f : "--" + f : d <= l ? "" + f + "++" : "" + f + "--" : j ? "" + b + " ? ++" + f + " : --" + f : "" + b + " ? " + f + "++ : " + f + "--", j && (m = "" + g + " = " + m), j && (k = "" + g + " = " + k);
              return "" + m + "; " + c + "; " + k
            }, b.prototype.compileArray = function(a) {
              var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p;
              if (this.fromNum && this.toNum && Math.abs(this.fromNum - this.toNum) <= 20) {
                j = function() {
                  p = [];
                  for (var a = n = +this.fromNum, b = +this.toNum; n <= b ? a <= b : a >= b; n <= b ? a++ : a--) p.push(a);
                  return p
                }.apply(this), this.exclusive && j.pop();
                return "[" + j.join(", ") + "]"
              }
              g = this.tab + R, f = a.scope.freeVariable("i"), k = a.scope.freeVariable("results"), i = "\n" + g + k + " = [];", this.fromNum && this.toNum ? (a.index = f, c = this.compileNode(a)) : (l = "" + f + " = " + this.fromC + (this.toC !== this.toVar ? ", " + this.toC : ""), d = "" + this.fromVar + " <= " + this.toVar, c = "var " + l + "; " + d + " ? " + f + " <" + this.equals + " " + this.toVar + " : " + f + " >" + this.equals + " " + this.toVar + "; " + d + " ? " + f + "++ : " + f + "--"), h = "{ " + k + ".push(" + f + "); }\n" + g + "return " + k + ";\n" + a.indent, e = function(a) {
                return a != null ? a.contains(function(a) {
                  return a instanceof A && a.value === "arguments" && !a.asKey
                }) : void 0
              };
              if (e(this.from) || e(this.to)) b = ", arguments";
              return "(function() {" + i + "\n" + g + "for (" + c + ")" + h + "}).apply(this" + (b != null ? b : "") + ")"
            };
            return b
          }(e), a.Slice = O = function(a) {
            function b(a) {
              this.range = a, b.__super__.constructor.call(this)
            }
            bl(b, a), b.name = "Slice", b.prototype.children = ["range"], b.prototype.compileNode = function(a) {
              var b, c, d, e, f, g;
              g = this.range, e = g.to, c = g.from, d = c && c.compile(a, y) || "0", b = e && e.compile(a, y), e && ( !! this.range.exclusive || +b !== -1) && (f = ", " + (this.range.exclusive ? b : L.test(b) ? "" + (+b + 1) : (b = e.compile(a, u), "" + b + " + 1 || 9e9")));
              return ".slice(" + d + (f || "") + ")"
            };
            return b
          }(e), a.Obj = E = function(a) {
            function b(a, b) {
              this.generated = b != null ? b : !1, this.objects = this.properties = a || []
            }
            bl(b, a), b.name = "Obj", b.prototype.children = ["properties"], b.prototype.compileNode = function(a) {
              var b, c, e, f, g, h, i, j, l, m, n, o, p, q, r, s;
              n = this.properties, m = [], s = this.properties;
              for (o = 0, q = s.length; o < q; o++) {
                j = s[o], j.isComplex() && (j = j.variable);
                if (j != null) {
                  l = j.unwrapAll().value.toString();
                  if (bm.call(m, l) >= 0) throw SyntaxError('multiple object literal properties named "' + l + '"');
                  m.push(l)
                }
              }
              if (!n.length) return this.front ? "({})" : "{}";
              if (this.generated) for (p = 0, r = n.length; p < r; p++) {
                h = n[p];
                if (h instanceof W) throw new Error("cannot have an implicit value in an implicit object")
              }
              c = a.indent += R, g = this.lastNonComment(this.properties), n = function() {
                var h, i, l;
                l = [];
                for (b = h = 0, i = n.length; h < i; b = ++h) j = n[b], f = b === n.length - 1 ? "" : j === g || j instanceof k ? "\n" : ",\n", e = j instanceof k ? "" : c, j instanceof W && j["this"] && (j = new d(j.properties[0].name, j, "object")), j instanceof k || (j instanceof d || (j = new d(j, j, "object")), (j.variable.base || j.variable).asKey = !0), l.push(e + j.compile(a, z) + f);
                return l
              }(), n = n.join(""), i = "{" + (n && "\n" + n + "\n" + this.tab) + "}";
              return this.front ? "(" + i + ")" : i
            }, b.prototype.assigns = function(a) {
              var b, c, d, e;
              e = this.properties;
              for (c = 0, d = e.length; c < d; c++) {
                b = e[c];
                if (b.assigns(a)) return !0
              }
              return !1
            };
            return b
          }(e), a.Arr = c = function(a) {
            function b(a) {
              this.objects = a || []
            }
            bl(b, a), b.name = "Arr", b.prototype.children = ["objects"], b.prototype.filterImplicitObjects = g.prototype.filterImplicitObjects, b.prototype.compileNode = function(a) {
              var b, c, d;
              if (!this.objects.length) return "[]";
              a.indent += R, d = this.filterImplicitObjects(this.objects);
              if (b = P.compileSplattedArray(a, d)) return b;
              b = function() {
                var b, e, f;
                f = [];
                for (b = 0, e = d.length; b < e; b++) c = d[b], f.push(c.compile(a, w));
                return f
              }().join(", ");
              return b.indexOf("\n") >= 0 ? "[\n" + a.indent + b + "\n" + this.tab + "]" : "[" + b + "]"
            }, b.prototype.assigns = function(a) {
              var b, c, d, e;
              e = this.objects;
              for (c = 0, d = e.length; c < d; c++) {
                b = e[c];
                if (b.assigns(a)) return !0
              }
              return !1
            };
            return b
          }(e), a.Class = h = function(a) {
            function c(a, b, c) {
              this.variable = a, this.parent = b, this.body = c != null ? c : new f, this.boundFuncs = [], this.body.classBody = !0
            }
            bl(c, a), c.name = "Class", c.prototype.children = ["variable", "parent", "body"], c.prototype.determineName = function() {
              var a, c;
              if (!this.variable) return null;
              a = (c = bc(this.variable.properties)) ? c instanceof b && c.name.value : this.variable.base.value;
              if (bm.call(M, a) >= 0) throw SyntaxError("variable name may not be " + a);
              return a && (a = o.test(a) && a)
            }, c.prototype.setContext = function(a) {
              return this.body.traverseChildren(!1, function(b) {
                if (b.classBody) return !1;
                if (b instanceof A && b.value === "this") return b.value = a;
                if (b instanceof j) {
                  b.klass = a;
                  if (b.bound) return b.context = a
                }
              })
            }, c.prototype.addBoundFunctions = function(a) {
              var c, d, e, f, g, h;
              if (this.boundFuncs.length) {
                g = this.boundFuncs, h = [];
                for (e = 0, f = g.length; e < f; e++) c = g[e], d = (new W(new A("this"), [new b(c)])).compile(a), h.push(this.ctor.body.unshift(new A("" + d + " = " + bh("bind") + "(" + d + ", this)")));
                return h
              }
            }, c.prototype.addProperties = function(a, c, e) {
              var f, g, h, i, k;
              k = a.base.properties.slice(0), h = function() {
                var a;
                a = [];
                while (f = k.shift()) {
                  if (f instanceof d) {
                    g = f.variable.base, delete f.context, i = f.value;
                    if (g.value === "constructor") {
                      if (this.ctor) throw new Error("cannot define more than one constructor in a class");
                      if (i.bound) throw new Error("cannot define a constructor as a bound function");
                      i instanceof j ? f = this.ctor = i : (this.externalCtor = e.scope.freeVariable("class"), f = new d(new A(this.externalCtor), i))
                    } else f.variable["this"] ? (i["static"] = !0, i.bound && (i.context = c)) : (f.variable = new W(new A(c), [new b(new A("prototype")), new b(g)]), i instanceof j && i.bound && (this.boundFuncs.push(g), i.bound = !1))
                  }
                  a.push(f)
                }
                return a
              }.call(this);
              return Z(h)
            }, c.prototype.walkBody = function(a, b) {
              var d = this;
              return this.traverseChildren(!1, function(e) {
                var g, h, i, j, k, l;
                if (e instanceof c) return !1;
                if (e instanceof f) {
                  l = g = e.expressions;
                  for (h = j = 0, k = l.length; j < k; h = ++j) i = l[h], i instanceof W && i.isObject(!0) && (g[h] = d.addProperties(i, a, b));
                  return e.expressions = g = bb(g)
                }
              })
            }, c.prototype.hoistDirectivePrologue = function() {
              var a, b, c;
              b = 0, a = this.body.expressions;
              while ((c = a[b]) && c instanceof k || c instanceof W && c.isString())++b;
              return this.directives = a.splice(0, b)
            }, c.prototype.ensureConstructor = function(a) {
              this.ctor || (this.ctor = new j, this.parent && this.ctor.body.push(new A("" + a + ".__super__.constructor.apply(this, arguments)")), this.externalCtor && this.ctor.body.push(new A("" + this.externalCtor + ".apply(this, arguments)")), this.ctor.body.makeReturn(), this.body.expressions.unshift(this.ctor)), this.ctor.ctor = this.ctor.name = a, this.ctor.klass = null;
              return this.ctor.noReturn = !0
            }, c.prototype.compileNode = function(a) {
              var c, e, f, g, h, k, l;
              e = this.determineName(), h = e || "_Class", h.reserved && (h = "_" + h), g = new A(h), this.hoistDirectivePrologue(), this.setContext(h), this.walkBody(h, a), this.ensureConstructor(h), this.body.spaced = !0, this.ctor instanceof j || this.body.expressions.unshift(this.ctor), e && this.body.expressions.unshift(new d(new W(new A(h), [new b(new A("name"))]), new A("'" + h + "'"))), this.body.expressions.push(g), (l = this.body.expressions).unshift.apply(l, this.directives), this.addBoundFunctions(a), c = i.wrap(this.body), this.parent && (this.superClass = new A(a.scope.freeVariable("super", !1)), this.body.expressions.unshift(new m(g, this.superClass)), c.args.push(this.parent), k = c.variable.params || c.variable.base.params, k.push(new G(this.superClass))), f = new H(c, !0), this.variable && (f = new d(this.variable, f));
              return f.compile(a)
            };
            return c
          }(e), a.Assign = d = function(a) {
            function c(a, b, c, d) {
              var e, f, g;
              this.variable = a, this.value = b, this.context = c, this.param = d && d.param, this.subpattern = d && d.subpattern, e = (g = f = this.variable.unwrapAll().value, bm.call(M, g) >= 0);
              if (e && this.context !== "object") throw SyntaxError('variable name may not be "' + f + '"')
            }
            bl(c, a), c.name = "Assign", c.prototype.children = ["variable", "value"], c.prototype.isStatement = function(a) {
              return (a != null ? a.level : void 0) === z && this.context != null && bm.call(this.context, "?") >= 0
            }, c.prototype.assigns = function(a) {
              return this[this.context === "object" ? "value" : "variable"].assigns(a)
            }, c.prototype.unfoldSoak = function(a) {
              return bg(a, this, "variable")
            }, c.prototype.compileNode = function(a) {
              var b, c, d, e, f, g, h, i, k;
              if (b = this.variable instanceof W) {
                if (this.variable.isArray() || this.variable.isObject()) return this.compilePatternMatch(a);
                if (this.variable.isSplice()) return this.compileSplice(a);
                if ((g = this.context) === "||=" || g === "&&=" || g === "?=") return this.compileConditional(a)
              }
              d = this.variable.compile(a, w);
              if (!this.context) {
                if (!(f = this.variable.unwrapAll()).isAssignable()) throw SyntaxError('"' + this.variable.compile(a) + '" cannot be assigned.');
                if (typeof f.hasProperties == "function" ? !f.hasProperties() : !void 0) this.param ? a.scope.add(d, "var") : a.scope.find(d)
              }
              this.value instanceof j && (c = B.exec(d)) && (c[1] && (this.value.klass = c[1]), this.value.name = (h = (i = (k = c[2]) != null ? k : c[3]) != null ? i : c[4]) != null ? h : c[5]), e = this.value.compile(a, w);
              if (this.context === "object") return "" + d + ": " + e;
              e = d + (" " + (this.context || "=") + " ") + e;
              return a.level <= w ? e : "(" + e + ")"
            }, c.prototype.compilePatternMatch = function(a) {
              var d, e, f, g, h, i, j, k, l, m, n, p, q, r, s, u, v, y, B, C, D, E, F, G, J, K, L;
              s = a.level === z, v = this.value, m = this.variable.base.objects;
              if (!(n = m.length)) {
                f = v.compile(a);
                return a.level >= x ? "(" + f + ")" : f
              }
              i = this.variable.isObject();
              if (s && n === 1 && !((l = m[0]) instanceof P)) {
                l instanceof c ? (D = l, E = D.variable, h = E.base, l = D.value) : l.base instanceof H ? (F = (new W(l.unwrapAll())).cacheReference(a), l = F[0], h = F[1]) : h = i ? l["this"] ? l.properties[0].name : l : new A(0), d = o.test(h.unwrap().value || 0), v = new W(v), v.properties.push(new(d ? b : t)(h));
                if (G = l.unwrap().value, bm.call(I, G) >= 0) throw new SyntaxError("assignment to a reserved word: " + l.compile(a) + " = " + v.compile(a));
                return (new c(l, v, null, {
                  param: this.param
                })).compile(a, z)
              }
              y = v.compile(a, w), e = [], r = !1;
              if (!o.test(y) || this.variable.assigns(y)) e.push("" + (p = a.scope.freeVariable("ref")) + " = " + y), y = p;
              for (g = B = 0, C = m.length; B < C; g = ++B) {
                l = m[g], h = g, i && (l instanceof c ? (J = l, K = J.variable, h = K.base, l = J.value) : l.base instanceof H ? (L = (new W(l.unwrapAll())).cacheReference(a), l = L[0], h = L[1]) : h = l["this"] ? l.properties[0].name : l);
                if (!r && l instanceof P) k = l.name.unwrap().value, l = l.unwrap(), u = "" + n + " <= " + y + ".length ? " + bh("slice") + ".call(" + y + ", " + g, (q = n - g - 1) ? (j = a.scope.freeVariable("i"), u += ", " + j + " = " + y + ".length - " + q + ") : (" + j + " = " + g + ", [])") : u += ") : []", u = new A(u), r = "" + j + "++";
                else {
                  k = l.unwrap().value;
                  if (l instanceof P) {
                    l = l.name.compile(a);
                    throw new SyntaxError("multiple splats are disallowed in an assignment: " + l + "...")
                  }
                  typeof h == "number" ? (h = new A(r || h), d = !1) : d = i && o.test(h.unwrap().value || 0), u = new W(new A(y), [new(d ? b : t)(h)])
                }
                if (k != null && bm.call(I, k) >= 0) throw new SyntaxError("assignment to a reserved word: " + l.compile(a) + " = " + u.compile(a));
                e.push((new c(l, u, null, {
                  param: this.param,
                  subpattern: !0
                })).compile(a, w))
              }!s && !this.subpattern && e.push(y), f = e.join(", ");
              return a.level < w ? f : "(" + f + ")"
            }, c.prototype.compileConditional = function(a) {
              var b, d, e;
              e = this.variable.cacheReference(a), b = e[0], d = e[1];
              if (b.base instanceof A && b.base.value !== "this" && !a.scope.check(b.base.value)) throw new Error('the variable "' + b.base.value + "\" can't be assigned with " + this.context + " because it has not been defined.");
              bm.call(this.context, "?") >= 0 && (a.isExistentialEquals = !0);
              return (new F(this.context.slice(0, -1), b, new c(d, this.value, "="))).compile(a)
            }, c.prototype.compileSplice = function(a) {
              var b, c, d, e, f, g, h, i, j, k, l, m;
              k = this.variable.properties.pop().range, d = k.from, h = k.to, c = k.exclusive, g = this.variable.compile(a), l = (d != null ? d.cache(a, x) : void 0) || ["0", "0"], e = l[0], f = l[1], h ? (d != null ? d.isSimpleNumber() : void 0) && h.isSimpleNumber() ? (h = +h.compile(a) - +f, c || (h += 1)) : (h = h.compile(a, u) + " - " + f, c || (h += " + 1")) : h = "9e9", m = this.value.cache(a, w), i = m[0], j = m[1], b = "[].splice.apply(" + g + ", [" + e + ", " + h + "].concat(" + i + ")), " + j;
              return a.level > z ? "(" + b + ")" : b
            };
            return c
          }(e), a.Code = j = function(a) {
            function b(a, b, c) {
              this.params = a || [], this.body = b || new f, this.bound = c === "boundfunc", this.bound && (this.context = "_this")
            }
            bl(b, a), b.name = "Code", b.prototype.children = ["params", "body"], b.prototype.isStatement = function() {
              return !!this.ctor
            }, b.prototype.jumps = D, b.prototype.compileNode = function(a) {
              var b, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, v, w, x, y, z, B, C, D, E, G, H, I, J, K, L, M, O;
              a.scope = new N(a.scope, this.body, this), a.scope.shared = $(a, "sharedScope"), a.indent += R, delete a.bare, delete a.isExistentialEquals, l = [], e = [], H = this.paramNames();
              for (s = 0, x = H.length; s < x; s++) i = H[s], a.scope.check(i) || a.scope.parameter(i);
              I = this.params;
              for (t = 0, y = I.length; t < y; t++) {
                k = I[t];
                if (!k.splat) continue;
                J = this.params;
                for (v = 0, z = J.length; v < z; v++) j = J[v], j.name.value && a.scope.add(j.name.value, "var", !0);
                n = new d(new W(new c(function() {
                  var b, c, d, e;
                  d = this.params, e = [];
                  for (b = 0, c = d.length; b < c; b++) j = d[b], e.push(j.asReference(a));
                  return e
                }.call(this))), new W(new A("arguments")));
                break
              }
              K = this.params;
              for (w = 0, B = K.length; w < B; w++) k = K[w], k.isComplex() ? (p = m = k.asReference(a), k.value && (p = new F("?", m, k.value)), e.push(new d(new W(k.name), p, "=", {
                param: !0
              }))) : (m = k, k.value && (h = new A(m.name.value + " == null"), p = new d(new W(k.name), k.value, "="), e.push(new r(h, p)))), n || l.push(m);
              q = this.body.isEmpty(), n && e.unshift(n), e.length && (L = this.body.expressions).unshift.apply(L, e);
              for (f = E = 0, C = l.length; E < C; f = ++E) j = l[f], a.scope.parameter(l[f] = j.compile(a));
              o = [], M = this.paramNames();
              for (G = 0, D = M.length; G < D; G++) {
                i = M[G];
                if (bm.call(o, i) >= 0) throw SyntaxError("multiple parameters named '" + i + "'");
                o.push(i)
              }!q && !this.noReturn && this.body.makeReturn(), this.bound && (((O = a.scope.parent.method) != null ? O.bound : void 0) ? this.bound = this.context = a.scope.parent.method.context : this["static"] || a.scope.parent.assign("_this", "this")), g = a.indent, b = "function", this.ctor && (b += " " + this.name), b += "(" + l.join(", ") + ") {", this.body.isEmpty() || (b += "\n" + this.body.compileWithDeclarations(a) + "\n" + this.tab), b += "}";
              if (this.ctor) return this.tab + b;
              return this.front || a.level >= u ? "(" + b + ")" : b
            }, b.prototype.paramNames = function() {
              var a, b, c, d, e;
              a = [], e = this.params;
              for (c = 0, d = e.length; c < d; c++) b = e[c], a.push.apply(a, b.names());
              return a
            }, b.prototype.traverseChildren = function(a, c) {
              if (a) return b.__super__.traverseChildren.call(this, a, c)
            };
            return b
          }(e), a.Param = G = function(a) {
            function b(a, b, c) {
              var d;
              this.name = a, this.value = b, this.splat = c;
              if (d = a = this.name.unwrapAll().value, bm.call(M, d) >= 0) throw SyntaxError('parameter name "' + a + '" is not allowed')
            }
            bl(b, a), b.name = "Param", b.prototype.children = ["name", "value"], b.prototype.compile = function(a) {
              return this.name.compile(a, w)
            }, b.prototype.asReference = function(a) {
              var b;
              if (this.reference) return this.reference;
              b = this.name, b["this"] ? (b = b.properties[0].name, b.value.reserved && (b = new A(a.scope.freeVariable(b.value)))) : b.isComplex() && (b = new A(a.scope.freeVariable("arg"))), b = new W(b), this.splat && (b = new P(b));
              return this.reference = b
            }, b.prototype.isComplex = function() {
              return this.name.isComplex()
            }, b.prototype.names = function(a) {
              var b, c, e, f, g, h;
              a == null && (a = this.name), b = function(a) {
                var b;
                b = a.properties[0].name.value;
                return b.reserved ? [] : [b]
              };
              if (a instanceof A) return [a.value];
              if (a instanceof W) return b(a);
              c = [], h = a.objects;
              for (f = 0, g = h.length; f < g; f++) e = h[f], e instanceof d ? c.push(e.variable.base.value) : e.isArray() || e.isObject() ? c.push.apply(c, this.names(e.base)) : e["this"] ? c.push.apply(c, b(e)) : c.push(e.base.value);
              return c
            };
            return b
          }(e), a.Splat = P = function(a) {
            function b(a) {
              this.name = a.compile ? a : new A(a)
            }
            bl(b, a), b.name = "Splat", b.prototype.children = ["name"], b.prototype.isAssignable = Y, b.prototype.assigns = function(a) {
              return this.name.assigns(a)
            }, b.prototype.compile = function(a) {
              return this.index != null ? this.compileParam(a) : this.name.compile(a)
            }, b.prototype.unwrap = function() {
              return this.name
            }, b.compileSplattedArray = function(a, c, d) {
              var e, f, g, h, i, j, k, l;
              i = -1;
              while ((j = c[++i]) && !(j instanceof b)) continue;
              if (i >= c.length) return "";
              if (c.length === 1) {
                g = c[0].compile(a, w);
                if (d) return g;
                return "" + bh("slice") + ".call(" + g + ")"
              }
              e = c.slice(i);
              for (h = k = 0, l = e.length; k < l; h = ++k) j = e[h], g = j.compile(a, w), e[h] = j instanceof b ? "" + bh("slice") + ".call(" + g + ")" : "[" + g + "]";
              if (i === 0) return e[0] + (".concat(" + e.slice(1).join(", ") + ")");
              f = function() {
                var b, d, e, f;
                e = c.slice(0, i), f = [];
                for (b = 0, d = e.length; b < d; b++) j = e[b], f.push(j.compile(a, w));
                return f
              }();
              return "[" + f.join(", ") + "].concat(" + e.join(", ") + ")"
            };
            return b
          }(e), a.While = X = function(a) {
            function b(a, b) {
              this.condition = (b != null ? b.invert : void 0) ? a.invert() : a, this.guard = b != null ? b.guard : void 0
            }
            bl(b, a), b.name = "While", b.prototype.children = ["condition", "guard", "body"], b.prototype.isStatement = Y, b.prototype.makeReturn = function(a) {
              if (a) return b.__super__.makeReturn.apply(this, arguments);
              this.returns = !this.jumps({
                loop: !0
              });
              return this
            }, b.prototype.addBody = function(a) {
              this.body = a;
              return this
            }, b.prototype.jumps = function() {
              var a, b, c, d;
              a = this.body.expressions;
              if (!a.length) return !1;
              for (c = 0, d = a.length; c < d; c++) {
                b = a[c];
                if (b.jumps({
                  loop: !0
                })) return b
              }
              return !1
            }, b.prototype.compileNode = function(a) {
              var b, c, d, e;
              a.indent += R, e = "", b = this.body, b.isEmpty() ? b = "" : (this.returns && (b.makeReturn(d = a.scope.freeVariable("results")), e = "" + this.tab + d + " = [];\n"), this.guard && (b.expressions.length > 1 ? b.expressions.unshift(new r((new H(this.guard)).invert(), new A("continue"))) : this.guard && (b = f.wrap([new r(this.guard, b)]))), b = "\n" + b.compile(a, z) + "\n" + this.tab), c = e + this.tab + ("while (" + this.condition.compile(a, y) + ") {" + b + "}"), this.returns && (c += "\n" + this.tab + "return " + d + ";");
              return c
            };
            return b
          }(e), a.Op = F = function(a) {
            function e(a, c, d, e) {
              if (a === "in") return new s(c, d);
              if (a === "do") return this.generateDo(c);
              if (a === "new") {
                if (c instanceof g && !c["do"] && !c.isNew) return c.newInstance();
                if (c instanceof j && c.bound || c["do"]) c = new H(c)
              }
              this.operator = b[a] || a, this.first = c, this.second = d, this.flip = !! e;
              return this
            }
            var b, c;
            bl(e, a), e.name = "Op", b = {
              "==": "===",
              "!=": "!==",
              of: "in"
            }, c = {
              "!==": "===",
              "===": "!=="
            }, e.prototype.children = ["first", "second"], e.prototype.isSimpleNumber = D, e.prototype.isUnary = function() {
              return !this.second
            }, e.prototype.isComplex = function() {
              var a;
              return !this.isUnary() || (a = this.operator) !== "+" && a !== "-" || this.first.isComplex()
            }, e.prototype.isChainable = function() {
              var a;
              return (a = this.operator) === "<" || a === ">" || a === ">=" || a === "<=" || a === "===" || a === "!=="
            }, e.prototype.invert = function() {
              var a, b, d, f, g;
              if (this.isChainable() && this.first.isChainable()) {
                a = !0, b = this;
                while (b && b.operator) a && (a = b.operator in c), b = b.first;
                if (!a) return (new H(this)).invert();
                b = this;
                while (b && b.operator) b.invert = !b.invert, b.operator = c[b.operator], b = b.first;
                return this
              }
              if (f = c[this.operator]) {
                this.operator = f, this.first.unwrap() instanceof e && this.first.invert();
                return this
              }
              return this.second ? (new H(this)).invert() : this.operator === "!" && (d = this.first.unwrap()) instanceof e && ((g = d.operator) === "!" || g === "in" || g === "instanceof") ? d : new e("!", this)
            }, e.prototype.unfoldSoak = function(a) {
              var b;
              return ((b = this.operator) === "++" || b === "--" || b === "delete") && bg(a, this, "first")
            }, e.prototype.generateDo = function(a) {
              var b, c, e, f, h, i, k, l;
              f = [], c = a instanceof d && (h = a.value.unwrap()) instanceof j ? h : a, l = c.params || [];
              for (i = 0, k = l.length; i < k; i++) e = l[i], e.value ? (f.push(e.value), delete e.value) : f.push(e);
              b = new g(a, f), b["do"] = !0;
              return b
            }, e.prototype.compileNode = function(a) {
              var b, c, d, e;
              c = this.isChainable() && this.first.isChainable(), c || (this.first.front = this.front);
              if (this.operator === "delete" && a.scope.check(this.first.unwrapAll().value)) throw SyntaxError("delete operand may not be argument or var");
              if (((d = this.operator) === "--" || d === "++") && (e = this.first.unwrapAll().value, bm.call(M, e) >= 0)) throw SyntaxError("prefix increment/decrement may not have eval or arguments operand");
              if (this.isUnary()) return this.compileUnary(a);
              if (c) return this.compileChain(a);
              if (this.operator === "?") return this.compileExistence(a);
              b = this.first.compile(a, x) + " " + this.operator + " " + this.second.compile(a, x);
              return a.level <= x ? b : "(" + b + ")"
            }, e.prototype.compileChain = function(a) {
              var b, c, d, e;
              e = this.first.second.cache(a), this.first.second = e[0], d = e[1], c = this.first.compile(a, x), b = "" + c + " " + (this.invert ? "&&" : "||") + " " + d.compile(a) + " " + this.operator + " " + this.second.compile(a, x);
              return "(" + b + ")"
            }, e.prototype.compileExistence = function(a) {
              var b, c;
              this.first.isComplex() && a.level > z ? (c = new A(a.scope.freeVariable("ref")), b = new H(new d(c, this.first))) : (b = this.first, c = b);
              return (new r(new l(b), c, {
                type: "if"
              })).addElse(this.second).compile(a)
            }, e.prototype.compileUnary = function(a) {
              var b, c, d;
              if (a.level >= u) return (new H(this)).compile(a);
              c = [b = this.operator], d = b === "+" || b === "-", (b === "new" || b === "typeof" || b === "delete" || d && this.first instanceof e && this.first.operator === b) && c.push(" ");
              if (d && this.first instanceof e || b === "new" && this.first.isStatement(a)) this.first = new H(this.first);
              c.push(this.first.compile(a, x)), this.flip && c.reverse();
              return c.join("")
            }, e.prototype.toString = function(a) {
              return e.__super__.toString.call(this, a, this.constructor.name + " " + this.operator)
            };
            return e
          }(e), a.In = s = function(a) {
            function b(a, b) {
              this.object = a, this.array = b
            }
            bl(b, a), b.name = "In", b.prototype.children = ["object", "array"], b.prototype.invert = C, b.prototype.compileNode = function(a) {
              var b, c, d, e, f;
              if (this.array instanceof W && this.array.isArray()) {
                f = this.array.base.objects;
                for (d = 0, e = f.length; d < e; d++) {
                  c = f[d];
                  if (!(c instanceof P)) continue;
                  b = !0;
                  break
                }
                if (!b) return this.compileOrTest(a)
              }
              return this.compileLoopTest(a)
            }, b.prototype.compileOrTest = function(a) {
              var b, c, d, e, f, g, h, i, j;
              if (this.array.base.objects.length === 0) return "" + !! this.negated;
              i = this.object.cache(a, x), g = i[0], f = i[1], j = this.negated ? [" !== ", " && "] : [" === ", " || "], b = j[0], c = j[1], h = function() {
                var c, h, i, j;
                i = this.array.base.objects, j = [];
                for (d = c = 0, h = i.length; c < h; d = ++c) e = i[d], j.push((d ? f : g) + b + e.compile(a, u));
                return j
              }.call(this), h = h.join(c);
              return a.level < x ? h : "(" + h + ")"
            }, b.prototype.compileLoopTest = function(a) {
              var b, c, d, e;
              e = this.object.cache(a, w), d = e[0], c = e[1], b = bh("indexOf") + (".call(" + this.array.compile(a, w) + ", " + c + ") ") + (this.negated ? "< 0" : ">= 0");
              if (d === c) return b;
              b = d + ", " + b;
              return a.level < w ? b : "(" + b + ")"
            }, b.prototype.toString = function(a) {
              return b.__super__.toString.call(this, a, this.constructor.name + (this.negated ? "!" : ""))
            };
            return b
          }(e), a.Try = U = function(a) {
            function b(a, b, c, d) {
              this.attempt = a, this.error = b, this.recovery = c, this.ensure = d
            }
            bl(b, a), b.name = "Try", b.prototype.children = ["attempt", "recovery", "ensure"], b.prototype.isStatement = Y, b.prototype.jumps = function(a) {
              var b;
              return this.attempt.jumps(a) || ((b = this.recovery) != null ? b.jumps(a) : void 0)
            }, b.prototype.makeReturn = function(a) {
              this.attempt && (this.attempt = this.attempt.makeReturn(a)), this.recovery && (this.recovery = this.recovery.makeReturn(a));
              return this
            }, b.prototype.compileNode = function(a) {
              var b, c, d, e;
              a.indent += R, d = this.error ? " (" + this.error.compile(a) + ") " : " ", e = this.attempt.compile(a, z), b = function() {
                var b;
                if (this.recovery) {
                  if (b = this.error.value, bm.call(M, b) >= 0) throw SyntaxError('catch variable may not be "' + this.error.value + '"');
                  a.scope.check(this.error.value) || a.scope.add(this.error.value, "param");
                  return " catch" + d + "{\n" + this.recovery.compile(a, z) + "\n" + this.tab + "}"
                }
                if (!this.ensure && !this.recovery) return " catch (_error) {}"
              }.call(this), c = this.ensure ? " finally {\n" + this.ensure.compile(a, z) + "\n" + this.tab + "}" : "";
              return "" + this.tab + "try {\n" + e + "\n" + this.tab + "}" + (b || "") + c
            };
            return b
          }(e), a.Throw = T = function(a) {
            function b(a) {
              this.expression = a
            }
            bl(b, a), b.name = "Throw", b.prototype.children = ["expression"], b.prototype.isStatement = Y, b.prototype.jumps = D, b.prototype.makeReturn = S, b.prototype.compileNode = function(a) {
              return this.tab + ("throw " + this.expression.compile(a) + ";")
            };
            return b
          }(e), a.Existence = l = function(a) {
            function b(a) {
              this.expression = a
            }
            bl(b, a), b.name = "Existence", b.prototype.children = ["expression"], b.prototype.invert = C, b.prototype.compileNode = function(a) {
              var b, c, d, e;
              this.expression.front = this.front, d = this.expression.compile(a, x), o.test(d) && !a.scope.check(d) ? (e = this.negated ? ["===", "||"] : ["!==", "&&"], b = e[0], c = e[1], d = "typeof " + d + " " + b + ' "undefined" ' + c + " " + d + " " + b + " null") : d = "" + d + " " + (this.negated ? "==" : "!=") + " null";
              return a.level <= v ? d : "(" + d + ")"
            };
            return b
          }(e), a.Parens = H = function(a) {
            function b(a) {
              this.body = a
            }
            bl(b, a), b.name = "Parens", b.prototype.children = ["body"], b.prototype.unwrap = function() {
              return this.body
            }, b.prototype.isComplex = function() {
              return this.body.isComplex()
            }, b.prototype.compileNode = function(a) {
              var b, c, d;
              d = this.body.unwrap();
              if (d instanceof W && d.isAtomic()) {
                d.front = this.front;
                return d.compile(a)
              }
              c = d.compile(a, y), b = a.level < x && (d instanceof F || d instanceof g || d instanceof n && d.returns);
              return b ? c : "(" + c + ")"
            };
            return b
          }(e), a.For = n = function(a) {
            function b(a, b) {
              var c;
              this.source = b.source, this.guard = b.guard, this.step = b.step, this.name = b.name, this.index = b.index, this.body = f.wrap([a]), this.own = !! b.own, this.object = !! b.object, this.object && (c = [this.index, this.name], this.name = c[0], this.index = c[1]);
              if (this.index instanceof W) throw SyntaxError("index cannot be a pattern matching expression");
              this.range = this.source instanceof W && this.source.base instanceof J && !this.source.properties.length, this.pattern = this.name instanceof W;
              if (this.range && this.index) throw SyntaxError("indexes do not apply to range loops");
              if (this.range && this.pattern) throw SyntaxError("cannot pattern match over range loops");
              this.returns = !1
            }
            bl(b, a), b.name = "For", b.prototype.children = ["body", "source", "guard", "step"], b.prototype.compileNode = function(a) {
              var b, c, e, g, h, i, j, k, l, m, n, p, q, s, t, u, v, y, B, C, D, E, F, G, I;
              b = f.wrap([this.body]), n = (I = bc(b.expressions)) != null ? I.jumps() : void 0, n && n instanceof K && (this.returns = !1), C = this.range ? this.source.base : this.source, B = a.scope, q = this.name && this.name.compile(a, w), j = this.index && this.index.compile(a, w), q && !this.pattern && B.find(q, {
                immediate: !0
              }), j && B.find(j, {
                immediate: !0
              }), this.returns && (y = B.freeVariable("results")), k = this.object && j || B.freeVariable("i"), l = this.range && q || j || k, m = l !== k ? "" + l + " = " : "", this.step && !this.range && (E = B.freeVariable("step")), this.pattern && (q = k), G = "", h = "", c = "", i = this.tab + R, this.range ? e = C.compile(bd(a, {
                index: k,
                name: q,
                step: this.step
              })) : (F = this.source.compile(a, w), (q || this.own) && !o.test(F) && (c = "" + this.tab + (t = B.freeVariable("ref")) + " = " + F + ";\n", F = t), q && !this.pattern && (s = "" + q + " = " + F + "[" + l + "]"), this.object || (p = B.freeVariable("len"), g = "" + m + k + " = 0, " + p + " = " + F + ".length", this.step && (g += ", " + E + " = " + this.step.compile(a, x)), D = "" + m + (this.step ? "" + k + " += " + E : l !== k ? "++" + k : "" + k + "++"), e = "" + g + "; " + k + " < " + p + "; " + D)), this.returns && (u = "" + this.tab + y + " = [];\n", v = "\n" + this.tab + "return " + y + ";", b.makeReturn(y)), this.guard && (b.expressions.length > 1 ? b.expressions.unshift(new r((new H(this.guard)).invert(), new A("continue"))) : this.guard && (b = f.wrap([new r(this.guard, b)]))), this.pattern && b.expressions.unshift(new d(this.name, new A("" + F + "[" + l + "]"))), c += this.pluckDirectCall(a, b), s && (G = "\n" + i + s + ";"), this.object && (e = "" + l + " in " + F, this.own && (h = "\n" + i + "if (!" + bh("hasProp") + ".call(" + F + ", " + l + ")) continue;")), b = b.compile(bd(a, {
                indent: i
              }), z), b && (b = "\n" + b + "\n");
              return "" + c + (u || "") + this.tab + "for (" + e + ") {" + h + G + b + this.tab + "}" + (v || "")
            }, b.prototype.pluckDirectCall = function(a, b) {
              var c, e, f, h, i, k, l, m, n, o, p, q, r, s, t;
              e = "", o = b.expressions;
              for (i = m = 0, n = o.length; m < n; i = ++m) {
                f = o[i], f = f.unwrapAll();
                if (!(f instanceof g)) continue;
                l = f.variable.unwrapAll();
                if (!(l instanceof j || l instanceof W && ((p = l.base) != null ? p.unwrapAll() : void 0) instanceof j && l.properties.length === 1 && ((q = (r = l.properties[0].name) != null ? r.value : void 0) === "call" || q === "apply"))) continue;
                h = ((s = l.base) != null ? s.unwrapAll() : void 0) || l, k = new A(a.scope.freeVariable("fn")), c = new W(k), l.base && (t = [c, l], l.base = t[0], c = t[1]), b.expressions[i] = new g(c, f.args), e += this.tab + (new d(k, h)).compile(a, z) + ";\n"
              }
              return e
            };
            return b
          }(X), a.Switch = Q = function(a) {
            function b(a, b, c) {
              this.subject = a, this.cases = b, this.otherwise = c
            }
            bl(b, a), b.name = "Switch", b.prototype.children = ["subject", "cases", "otherwise"], b.prototype.isStatement = Y, b.prototype.jumps = function(a) {
              var b, c, d, e, f, g, h;
              a == null && (a = {
                block: !0
              }), f = this.cases;
              for (d = 0, e = f.length; d < e; d++) {
                g = f[d], c = g[0], b = g[1];
                if (b.jumps(a)) return b
              }
              return (h = this.otherwise) != null ? h.jumps(a) : void 0
            }, b.prototype.makeReturn = function(a) {
              var b, c, d, e, g;
              e = this.cases;
              for (c = 0, d = e.length; c < d; c++) b = e[c], b[1].makeReturn(a);
              a && (this.otherwise || (this.otherwise = new f([new A("void 0")]))), (g = this.otherwise) != null && g.makeReturn(a);
              return this
            }, b.prototype.compileNode = function(a) {
              var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r;
              i = a.indent + R, j = a.indent = i + R, d = this.tab + ("switch (" + (((o = this.subject) != null ? o.compile(a, y) : void 0) || !1) + ") {\n"), p = this.cases;
              for (h = k = 0, m = p.length; k < m; h = ++k) {
                q = p[h], f = q[0], b = q[1], r = bb([f]);
                for (l = 0, n = r.length; l < n; l++) e = r[l], this.subject || (e = e.invert()), d += i + ("case " + e.compile(a, y) + ":\n");
                if (c = b.compile(a, z)) d += c + "\n";
                if (h === this.cases.length - 1 && !this.otherwise) break;
                g = this.lastNonComment(b.expressions);
                if (g instanceof K || g instanceof A && g.jumps() && g.value !== "debugger") continue;
                d += j + "break;\n"
              }
              this.otherwise && this.otherwise.expressions.length && (d += i + ("default:\n" + this.otherwise.compile(a, z) + "\n"));
              return d + this.tab + "}"
            };
            return b
          }(e), a.If = r = function(a) {
            function b(a, b, c) {
              this.body = b, c == null && (c = {}), this.condition = c.type === "unless" ? a.invert() : a, this.elseBody = null, this.isChain = !1, this.soak = c.soak
            }
            bl(b, a), b.name = "If", b.prototype.children = ["condition", "body", "elseBody"], b.prototype.bodyNode = function() {
              var a;
              return (a = this.body) != null ? a.unwrap() : void 0
            }, b.prototype.elseBodyNode = function() {
              var a;
              return (a = this.elseBody) != null ? a.unwrap() : void 0
            }, b.prototype.addElse = function(a) {
              this.isChain ? this.elseBodyNode().addElse(a) : (this.isChain = a instanceof b, this.elseBody = this.ensureBlock(a));
              return this
            }, b.prototype.isStatement = function(a) {
              var b;
              return (a != null ? a.level : void 0) === z || this.bodyNode().isStatement(a) || ((b = this.elseBodyNode()) != null ? b.isStatement(a) : void 0)
            }, b.prototype.jumps = function(a) {
              var b;
              return this.body.jumps(a) || ((b = this.elseBody) != null ? b.jumps(a) : void 0)
            }, b.prototype.compileNode = function(a) {
              return this.isStatement(a) ? this.compileStatement(a) : this.compileExpression(a)
            }, b.prototype.makeReturn = function(a) {
              a && (this.elseBody || (this.elseBody = new f([new A("void 0")]))), this.body && (this.body = new f([this.body.makeReturn(a)])), this.elseBody && (this.elseBody = new f([this.elseBody.makeReturn(a)]));
              return this
            }, b.prototype.ensureBlock = function(a) {
              return a instanceof f ? a : new f([a])
            }, b.prototype.compileStatement = function(a) {
              var c, d, e, f, g, h, i;
              e = $(a, "chainChild"), g = $(a, "isExistentialEquals");
              if (g) return (new b(this.condition.invert(), this.elseBodyNode(), {
                type: "if"
              })).compile(a);
              f = this.condition.compile(a, y), a.indent += R, c = this.ensureBlock(this.body), d = c.compile(a);
              if (1 === ((i = c.expressions) != null ? i.length : void 0) && !this.elseBody && !e && d && f && -1 === d.indexOf("\n") && 80 > f.length + d.length) return "" + this.tab + "if (" + f + ") " + d.replace(/^\s+/, "");
              d && (d = "\n" + d + "\n" + this.tab), h = "if (" + f + ") {" + d + "}", e || (h = this.tab + h);
              if (!this.elseBody) return h;
              return h + " else " + (this.isChain ? (a.indent = this.tab, a.chainChild = !0, this.elseBody.unwrap().compile(a, z)) : "{\n" + this.elseBody.compile(a, z) + "\n" + this.tab + "}")
            }, b.prototype.compileExpression = function(a) {
              var b, c, d, e;
              e = this.condition.compile(a, v), c = this.bodyNode().compile(a, w), b = this.elseBodyNode() ? this.elseBodyNode().compile(a, w) : "void 0", d = "" + e + " ? " + c + " : " + b;
              return a.level >= v ? "(" + d + ")" : d
            }, b.prototype.unfoldSoak = function() {
              return this.soak && this
            };
            return b
          }(e), i = {
            wrap: function(a, c, d) {
              var e, h, i, k, l;
              if (a.jumps()) return a;
              i = new j([], f.wrap([a])), e = [];
              if ((k = a.contains(this.literalArgs)) || a.contains(this.literalThis)) l = new A(k ? "apply" : "call"), e = [new A("this")], k && e.push(new A("arguments")), i = new W(i, [new b(l)]);
              i.noReturn = d, h = new g(i, e);
              return c ? f.wrap([h]) : h
            },
            literalArgs: function(a) {
              return a instanceof A && a.value === "arguments" && !a.asKey
            },
            literalThis: function(a) {
              return a instanceof A && a.value === "this" && !a.asKey || a instanceof j && a.bound
            }
          }, bg = function(a, b, c) {
            var d;
            if ( !! (d = b[c].unfoldSoak(a))) {
              b[c] = d.body, d.body = new W(b);
              return d
            }
          }, V = {
            "extends": function() {
              return "function(child, parent) { for (var key in parent) { if (" + bh("hasProp") + ".call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }"
            },
            bind: function() {
              return "function(fn, me){ return function(){ return fn.apply(me, arguments); }; }"
            },
            indexOf: function() {
              return "[].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }"
            },
            hasProp: function() {
              return "{}.hasOwnProperty"
            },
            slice: function() {
              return "[].slice"
            }
          }, z = 1, y = 2, w = 3, v = 4, x = 5, u = 6, R = "  ", p = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*", o = RegExp("^" + p + "$"), L = /^[+-]?\d+$/, B = RegExp("^(?:(" + p + ")\\.prototype(?:\\.(" + p + ")|\\[(\"(?:[^\\\\\"\\r\\n]|\\\\.)*\"|'(?:[^\\\\'\\r\\n]|\\\\.)*')\\]|\\[(0x[\\da-fA-F]+|\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\]))|(" + p + ")$"), q = /^['"]/, bh = function(a) {
            var b;
            b = "__" + a, N.root.assign(b, V[a]());
            return b
          }, be = function(a, b) {
            a = a.replace(/\n/g, "$&" + b);
            return a.replace(/\s+$/, "")
          }
        }).call(this)
      }, require["./coffee-script"] = new function() {
        var a = this;
        (function() {
          var b, c, d, e, f, g, h, i, j, k = {}.hasOwnProperty;
          e = require("fs"), h = require("path"), j = require("./lexer"), b = j.Lexer, c = j.RESERVED, g = require("./parser").parser, i = require("vm"), require.extensions ? require.extensions[".coffee"] = function(a, b) {
            var c;
            c = d(e.readFileSync(b, "utf8"), {
              filename: b
            });
            return a._compile(c, b)
          } : require.registerExtension && require.registerExtension(".coffee", function(a) {
            return d(a)
          }), a.VERSION = "1.2.1-pre", a.RESERVED = c, a.helpers = require("./helpers"), a.compile = d = function(b, c) {
            var d, e, h;
            c == null && (c = {}), h = a.helpers.merge;
            try {
              e = g.parse(f.tokenize(b)).compile(c);
              if (!c.header) return e
            } catch (i) {
              c.filename && (i.message = "In " + c.filename + ", " + i.message);
              throw i
            }
            d = "Generated by CoffeeScript " + this.VERSION;
            return "// " + d + "\n" + e
          }, a.tokens = function(a, b) {
            return f.tokenize(a, b)
          }, a.nodes = function(a, b) {
            return typeof a == "string" ? g.parse(f.tokenize(a, b)) : g.parse(a)
          }, a.run = function(a, b) {
            var c;
            b == null && (b = {}), c = require.main, c.filename = process.argv[1] = b.filename ? e.realpathSync(b.filename) : ".", c.moduleCache && (c.moduleCache = {}), c.paths = require("module")._nodeModulePaths(h.dirname(b.filename));
            return h.extname(c.filename) !== ".coffee" || require.extensions ? c._compile(d(a, b), c.filename) : c._compile(a, c.filename)
          }, a.eval = function(a, b) {
            var c, e, f, g, j, l, m, n, o, p, q, r, s, t;
            b == null && (b = {});
            if ( !! (a = a.trim())) {
              e = i.Script;
              if (e) {
                if (b.sandbox != null) {
                  if (b.sandbox instanceof e.createContext().constructor) m = b.sandbox;
                  else {
                    m = e.createContext(), r = b.sandbox;
                    for (g in r) {
                      if (!k.call(r, g)) continue;
                      n = r[g], m[g] = n
                    }
                  }
                  m.global = m.root = m.GLOBAL = m
                } else m = global;
                m.__filename = b.filename || "eval", m.__dirname = h.dirname(m.__filename);
                if (m === global && !m.module && !m.require) {
                  c = require("module"), m.module = q = new c(b.modulename || "eval"), m.require = t = function(a) {
                    return c._load(a, q, !0)
                  }, q.filename = m.__filename, s = Object.getOwnPropertyNames(require);
                  for (o = 0, p = s.length; o < p; o++) l = s[o], l !== "paths" && (t[l] = require[l]);
                  t.paths = q.paths = c._nodeModulePaths(process.cwd()), t.resolve = function(a) {
                    return c._resolveFilename(a, q)
                  }
                }
              }
              j = {};
              for (g in b) {
                if (!k.call(b, g)) continue;
                n = b[g], j[g] = n
              }
              j.bare = !0, f = d(a, j);
              return m === global ? i.runInThisContext(f) : i.runInContext(f, m)
            }
          }, f = new b, g.lexer = {
            lex: function() {
              var a, b;
              b = this.tokens[this.pos++] || [""], a = b[0], this.yytext = b[1], this.yylineno = b[2];
              return a
            },
            setInput: function(a) {
              this.tokens = a;
              return this.pos = 0
            },
            upcomingInput: function() {
              return ""
            }
          }, g.yy = require("./nodes")
        }).call(this)
      }, require["./browser"] = new function() {
        var exports = this;
        (function() {
          var CoffeeScript, runScripts;
          CoffeeScript = require("./coffee-script"), CoffeeScript.require = require, CoffeeScript.eval = function(code, options) {
            options == null && (options = {}), options.bare == null && (options.bare = !0);
            return eval(CoffeeScript.compile(code, options))
          }, CoffeeScript.run = function(a, b) {
            b == null && (b = {}), b.bare = !0;
            return Function(CoffeeScript.compile(a, b))()
          };
          typeof window != "undefined" && window !== null && (CoffeeScript.load = function(a, b) {
            var c;
            c = new(window.ActiveXObject || XMLHttpRequest)("Microsoft.XMLHTTP"), c.open("GET", a, !0), "overrideMimeType" in c && c.overrideMimeType("text/plain"), c.onreadystatechange = function() {
              var d;
              if (c.readyState === 4) {
                if ((d = c.status) === 0 || d === 200) CoffeeScript.run(c.responseText);
                else throw new Error("Could not load " + a);
                if (b) return b()
              }
            };
            return c.send(null)
          }, runScripts = function() {
            var a, b, c, d, e, f;
            f = document.getElementsByTagName("script"), a = function() {
              var a, b, c;
              c = [];
              for (a = 0, b = f.length; a < b; a++) e = f[a], e.type === "text/coffeescript" && c.push(e);
              return c
            }(), c = 0, d = a.length, (b = function() {
              var d;
              d = a[c++];
              if ((d != null ? d.type : void 0) === "text/coffeescript") {
                if (d.src) return CoffeeScript.load(d.src, b);
                CoffeeScript.run(d.innerHTML);
                return b()
              }
            })();
            return null
          }, window.addEventListener ? addEventListener("DOMContentLoaded", runScripts, !1) : attachEvent("onload", runScripts))
        }).call(this)
      };
      return require["./coffee-script"]
    }();
  typeof define == "function" && define.amd ? define(function() {
    return CoffeeScript
  }) : root.CoffeeScript = CoffeeScript
})(this)
;
// CodeMirror version 2.25
//
// All functions that need access to the editor's state live inside
// the CodeMirror function. Below that, at the bottom of the file,
// some utilities are defined.

// CodeMirror is the only global var we claim
var CodeMirror = (function() {
  // This is the function that produces an editor instance. Its
  // closure is used to store the editor state.
  function CodeMirror(place, givenOptions) {
    // Determine effective options based on given values and defaults.
    var options = {}, defaults = CodeMirror.defaults;
    for (var opt in defaults)
      if (defaults.hasOwnProperty(opt))
        options[opt] = (givenOptions && givenOptions.hasOwnProperty(opt) ? givenOptions : defaults)[opt];

    // The element in which the editor lives.
    var wrapper = document.createElement("div");
    wrapper.className = "CodeMirror" + (options.lineWrapping ? " CodeMirror-wrap" : "");
    // This mess creates the base DOM structure for the editor.
    wrapper.innerHTML =
      '<div style="overflow: hidden; position: relative; width: 3px; height: 0px;">' + // Wraps and hides input textarea
        '<textarea style="position: absolute; padding: 0; width: 1px; height: 1em" wrap="off" ' +
          'autocorrect="off" autocapitalize="off"></textarea></div>' +
      '<div class="CodeMirror-scroll" tabindex="-1">' +
        '<div style="position: relative">' + // Set to the height of the text, causes scrolling
          '<div style="position: relative">' + // Moved around its parent to cover visible view
            '<div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div>' +
            // Provides positioning relative to (visible) text origin
            '<div class="CodeMirror-lines"><div style="position: relative; z-index: 0">' +
              '<div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;"></div>' +
              '<pre class="CodeMirror-cursor">&#160;</pre>' + // Absolutely positioned blinky cursor
              '<div style="position: relative; z-index: -1"></div><div></div>' + // DIVs containing the selection and the actual code
            '</div></div></div></div></div>';
    if (place.appendChild) place.appendChild(wrapper); else place(wrapper);
    // I've never seen more elegant code in my life.
    var inputDiv = wrapper.firstChild, input = inputDiv.firstChild,
        scroller = wrapper.lastChild, code = scroller.firstChild,
        mover = code.firstChild, gutter = mover.firstChild, gutterText = gutter.firstChild,
        lineSpace = gutter.nextSibling.firstChild, measure = lineSpace.firstChild,
        cursor = measure.nextSibling, selectionDiv = cursor.nextSibling,
        lineDiv = selectionDiv.nextSibling;
    themeChanged(); keyMapChanged();
    // Needed to hide big blue blinking cursor on Mobile Safari
    if (ios) input.style.width = "0px";
    if (!webkit) lineSpace.draggable = true;
    lineSpace.style.outline = "none";
    if (options.tabindex != null) input.tabIndex = options.tabindex;
    if (options.autofocus) focusInput();
    if (!options.gutter && !options.lineNumbers) gutter.style.display = "none";
    // Needed to handle Tab key in KHTML
    if (khtml) inputDiv.style.height = "1px", inputDiv.style.position = "absolute";

    // Check for problem with IE innerHTML not working when we have a
    // P (or similar) parent node.
    try { stringWidth("x"); }
    catch (e) {
      if (e.message.match(/runtime/i))
        e = new Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)");
      throw e;
    }

    // Delayed object wrap timeouts, making sure only one is active. blinker holds an interval.
    var poll = new Delayed(), highlight = new Delayed(), blinker;

    // mode holds a mode API object. doc is the tree of Line objects,
    // work an array of lines that should be parsed, and history the
    // undo history (instance of History constructor).
    var mode, doc = new BranchChunk([new LeafChunk([new Line("")])]), work, focused;
    loadMode();
    // The selection. These are always maintained to point at valid
    // positions. Inverted is used to remember that the user is
    // selecting bottom-to-top.
    var sel = {from: {line: 0, ch: 0}, to: {line: 0, ch: 0}, inverted: false};
    // Selection-related flags. shiftSelecting obviously tracks
    // whether the user is holding shift.
    var shiftSelecting, lastClick, lastDoubleClick, lastScrollPos = 0, draggingText,
        overwrite = false, suppressEdits = false;
    // Variables used by startOperation/endOperation to track what
    // happened during the operation.
    var updateInput, userSelChange, changes, textChanged, selectionChanged, leaveInputAlone,
        gutterDirty, callbacks, maxLengthChanged;
    // Current visible range (may be bigger than the view window).
    var displayOffset = 0, showingFrom = 0, showingTo = 0, lastSizeC = 0;
    // bracketHighlighted is used to remember that a bracket has been
    // marked.
    var bracketHighlighted;
    // Tracks the maximum line length so that the horizontal scrollbar
    // can be kept static when scrolling.
    var maxLine = "", maxWidth;
    var tabCache = {};

    // Initialize the content.
    operation(function(){setValue(options.value || ""); updateInput = false;})();
    var history = new History();

    // Register our event handlers.
    connect(scroller, "mousedown", operation(onMouseDown));
    connect(scroller, "dblclick", operation(onDoubleClick));
    connect(lineSpace, "selectstart", e_preventDefault);
    // Gecko browsers fire contextmenu *after* opening the menu, at
    // which point we can't mess with it anymore. Context menu is
    // handled in onMouseDown for Gecko.
    if (!gecko) connect(scroller, "contextmenu", onContextMenu);
    connect(scroller, "scroll", function() {
      lastScrollPos = scroller.scrollTop;
      updateDisplay([]);
      if (options.fixedGutter) gutter.style.left = scroller.scrollLeft + "px";
      if (options.onScroll) options.onScroll(instance);
    });
    connect(window, "resize", function() {updateDisplay(true);});
    connect(input, "keyup", operation(onKeyUp));
    connect(input, "input", fastPoll);
    connect(input, "keydown", operation(onKeyDown));
    connect(input, "keypress", operation(onKeyPress));
    connect(input, "focus", onFocus);
    connect(input, "blur", onBlur);

    if (options.dragDrop) {
      connect(lineSpace, "dragstart", onDragStart);
      function drag_(e) {
        if (options.onDragEvent && options.onDragEvent(instance, addStop(e))) return;
        e_stop(e);
      }
      connect(scroller, "dragenter", drag_);
      connect(scroller, "dragover", drag_);
      connect(scroller, "drop", operation(onDrop));
    }
    connect(scroller, "paste", function(){focusInput(); fastPoll();});
    connect(input, "paste", fastPoll);
    connect(input, "cut", operation(function(){
      if (!options.readOnly) replaceSelection("");
    }));

    // Needed to handle Tab key in KHTML
    if (khtml) connect(code, "mouseup", function() {
        if (document.activeElement == input) input.blur();
        focusInput();
    });

    // IE throws unspecified error in certain cases, when
    // trying to access activeElement before onload
    var hasFocus; try { hasFocus = (document.activeElement == input); } catch(e) { }
    if (hasFocus || options.autofocus) setTimeout(onFocus, 20);
    else onBlur();

    function isLine(l) {return l >= 0 && l < doc.size;}
    // The instance object that we'll return. Mostly calls out to
    // local functions in the CodeMirror function. Some do some extra
    // range checking and/or clipping. operation is used to wrap the
    // call so that changes it makes are tracked, and the display is
    // updated afterwards.
    var instance = wrapper.CodeMirror = {
      getValue: getValue,
      setValue: operation(setValue),
      getSelection: getSelection,
      replaceSelection: operation(replaceSelection),
      focus: function(){window.focus(); focusInput(); onFocus(); fastPoll();},
      setOption: function(option, value) {
        var oldVal = options[option];
        options[option] = value;
        if (option == "mode" || option == "indentUnit") loadMode();
        else if (option == "readOnly" && value == "nocursor") {onBlur(); input.blur();}
        else if (option == "readOnly" && !value) {resetInput(true);}
        else if (option == "theme") themeChanged();
        else if (option == "lineWrapping" && oldVal != value) operation(wrappingChanged)();
        else if (option == "tabSize") updateDisplay(true);
        else if (option == "keyMap") keyMapChanged();
        if (option == "lineNumbers" || option == "gutter" || option == "firstLineNumber" || option == "theme") {
          gutterChanged();
          updateDisplay(true);
        }
      },
      getOption: function(option) {return options[option];},
      undo: operation(undo),
      redo: operation(redo),
      indentLine: operation(function(n, dir) {
        if (typeof dir != "string") {
          if (dir == null) dir = options.smartIndent ? "smart" : "prev";
          else dir = dir ? "add" : "subtract";
        }
        if (isLine(n)) indentLine(n, dir);
      }),
      indentSelection: operation(indentSelected),
      historySize: function() {return {undo: history.done.length, redo: history.undone.length};},
      clearHistory: function() {history = new History();},
      matchBrackets: operation(function(){matchBrackets(true);}),
      getTokenAt: operation(function(pos) {
        pos = clipPos(pos);
        return getLine(pos.line).getTokenAt(mode, getStateBefore(pos.line), pos.ch);
      }),
      getStateAfter: function(line) {
        line = clipLine(line == null ? doc.size - 1: line);
        return getStateBefore(line + 1);
      },
      cursorCoords: function(start, mode) {
        if (start == null) start = sel.inverted;
        return this.charCoords(start ? sel.from : sel.to, mode);
      },
      charCoords: function(pos, mode) {
        pos = clipPos(pos);
        if (mode == "local") return localCoords(pos, false);
        if (mode == "div") return localCoords(pos, true);
        return pageCoords(pos);
      },
      coordsChar: function(coords) {
        var off = eltOffset(lineSpace);
        return coordsChar(coords.x - off.left, coords.y - off.top);
      },
      markText: operation(markText),
      setBookmark: setBookmark,
      findMarksAt: findMarksAt,
      setMarker: operation(addGutterMarker),
      clearMarker: operation(removeGutterMarker),
      setLineClass: operation(setLineClass),
      hideLine: operation(function(h) {return setLineHidden(h, true);}),
      showLine: operation(function(h) {return setLineHidden(h, false);}),
      onDeleteLine: function(line, f) {
        if (typeof line == "number") {
          if (!isLine(line)) return null;
          line = getLine(line);
        }
        (line.handlers || (line.handlers = [])).push(f);
        return line;
      },
      lineInfo: lineInfo,
      addWidget: function(pos, node, scroll, vert, horiz) {
        pos = localCoords(clipPos(pos));
        var top = pos.yBot, left = pos.x;
        node.style.position = "absolute";
        code.appendChild(node);
        if (vert == "over") top = pos.y;
        else if (vert == "near") {
          var vspace = Math.max(scroller.offsetHeight, doc.height * textHeight()),
              hspace = Math.max(code.clientWidth, lineSpace.clientWidth) - paddingLeft();
          if (pos.yBot + node.offsetHeight > vspace && pos.y > node.offsetHeight)
            top = pos.y - node.offsetHeight;
          if (left + node.offsetWidth > hspace)
            left = hspace - node.offsetWidth;
        }
        node.style.top = (top + paddingTop()) + "px";
        node.style.left = node.style.right = "";
        if (horiz == "right") {
          left = code.clientWidth - node.offsetWidth;
          node.style.right = "0px";
        } else {
          if (horiz == "left") left = 0;
          else if (horiz == "middle") left = (code.clientWidth - node.offsetWidth) / 2;
          node.style.left = (left + paddingLeft()) + "px";
        }
        if (scroll)
          scrollIntoView(left, top, left + node.offsetWidth, top + node.offsetHeight);
      },

      lineCount: function() {return doc.size;},
      clipPos: clipPos,
      getCursor: function(start) {
        if (start == null) start = sel.inverted;
        return copyPos(start ? sel.from : sel.to);
      },
      somethingSelected: function() {return !posEq(sel.from, sel.to);},
      setCursor: operation(function(line, ch, user) {
        if (ch == null && typeof line.line == "number") setCursor(line.line, line.ch, user);
        else setCursor(line, ch, user);
      }),
      setSelection: operation(function(from, to, user) {
        (user ? setSelectionUser : setSelection)(clipPos(from), clipPos(to || from));
      }),
      getLine: function(line) {if (isLine(line)) return getLine(line).text;},
      getLineHandle: function(line) {if (isLine(line)) return getLine(line);},
      setLine: operation(function(line, text) {
        if (isLine(line)) replaceRange(text, {line: line, ch: 0}, {line: line, ch: getLine(line).text.length});
      }),
      removeLine: operation(function(line) {
        if (isLine(line)) replaceRange("", {line: line, ch: 0}, clipPos({line: line+1, ch: 0}));
      }),
      replaceRange: operation(replaceRange),
      getRange: function(from, to) {return getRange(clipPos(from), clipPos(to));},

      triggerOnKeyDown: operation(onKeyDown),
      execCommand: function(cmd) {return commands[cmd](instance);},
      // Stuff used by commands, probably not much use to outside code.
      moveH: operation(moveH),
      deleteH: operation(deleteH),
      moveV: operation(moveV),
      toggleOverwrite: function() {
        if(overwrite){
          overwrite = false;
          cursor.className = cursor.className.replace(" CodeMirror-overwrite", "");
        } else {
          overwrite = true;
          cursor.className += " CodeMirror-overwrite";
        }
      },

      posFromIndex: function(off) {
        var lineNo = 0, ch;
        doc.iter(0, doc.size, function(line) {
          var sz = line.text.length + 1;
          if (sz > off) { ch = off; return true; }
          off -= sz;
          ++lineNo;
        });
        return clipPos({line: lineNo, ch: ch});
      },
      indexFromPos: function (coords) {
        if (coords.line < 0 || coords.ch < 0) return 0;
        var index = coords.ch;
        doc.iter(0, coords.line, function (line) {
          index += line.text.length + 1;
        });
        return index;
      },
      scrollTo: function(x, y) {
        if (x != null) scroller.scrollLeft = x;
        if (y != null) scroller.scrollTop = y;
        updateDisplay([]);
      },

      operation: function(f){return operation(f)();},
      compoundChange: function(f){return compoundChange(f);},
      refresh: function(){
        updateDisplay(true);
        if (scroller.scrollHeight > lastScrollPos)
          scroller.scrollTop = lastScrollPos;
      },
      getInputField: function(){return input;},
      getWrapperElement: function(){return wrapper;},
      getScrollerElement: function(){return scroller;},
      getGutterElement: function(){return gutter;}
    };

    function getLine(n) { return getLineAt(doc, n); }
    function updateLineHeight(line, height) {
      gutterDirty = true;
      var diff = height - line.height;
      for (var n = line; n; n = n.parent) n.height += diff;
    }

    function setValue(code) {
      var top = {line: 0, ch: 0};
      updateLines(top, {line: doc.size - 1, ch: getLine(doc.size-1).text.length},
                  splitLines(code), top, top);
      updateInput = true;
    }
    function getValue() {
      var text = [];
      doc.iter(0, doc.size, function(line) { text.push(line.text); });
      return text.join("\n");
    }

    function onMouseDown(e) {
      setShift(e_prop(e, "shiftKey"));
      // Check whether this is a click in a widget
      for (var n = e_target(e); n != wrapper; n = n.parentNode)
        if (n.parentNode == code && n != mover) return;

      // See if this is a click in the gutter
      for (var n = e_target(e); n != wrapper; n = n.parentNode)
        if (n.parentNode == gutterText) {
          if (options.onGutterClick)
            options.onGutterClick(instance, indexOf(gutterText.childNodes, n) + showingFrom, e);
          return e_preventDefault(e);
        }

      var start = posFromMouse(e);

      switch (e_button(e)) {
      case 3:
        if (gecko && !mac) onContextMenu(e);
        return;
      case 2:
        if (start) setCursor(start.line, start.ch, true);
        setTimeout(focusInput, 20);
        return;
      }
      // For button 1, if it was clicked inside the editor
      // (posFromMouse returning non-null), we have to adjust the
      // selection.
      if (!start) {if (e_target(e) == scroller) e_preventDefault(e); return;}

      if (!focused) onFocus();

      var now = +new Date;
      if (lastDoubleClick && lastDoubleClick.time > now - 400 && posEq(lastDoubleClick.pos, start)) {
        e_preventDefault(e);
        setTimeout(focusInput, 20);
        return selectLine(start.line);
      } else if (lastClick && lastClick.time > now - 400 && posEq(lastClick.pos, start)) {
        lastDoubleClick = {time: now, pos: start};
        e_preventDefault(e);
        return selectWordAt(start);
      } else { lastClick = {time: now, pos: start}; }

      var last = start, going;
      if (options.dragDrop && dragAndDrop && !options.readOnly && !posEq(sel.from, sel.to) &&
          !posLess(start, sel.from) && !posLess(sel.to, start)) {
        // Let the drag handler handle this.
        if (webkit) lineSpace.draggable = true;
        function dragEnd(e2) {
          if (webkit) lineSpace.draggable = false;
          draggingText = false;
          up(); drop();
          if (Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10) {
            e_preventDefault(e2);
            setCursor(start.line, start.ch, true);
            focusInput();
          }
        }
        var up = connect(document, "mouseup", operation(dragEnd), true);
        var drop = connect(scroller, "drop", operation(dragEnd), true);
        draggingText = true;
        // IE's approach to draggable
        if (lineSpace.dragDrop) lineSpace.dragDrop();
        return;
      }
      e_preventDefault(e);
      setCursor(start.line, start.ch, true);

      function extend(e) {
        var cur = posFromMouse(e, true);
        if (cur && !posEq(cur, last)) {
          if (!focused) onFocus();
          last = cur;
          setSelectionUser(start, cur);
          updateInput = false;
          var visible = visibleLines();
          if (cur.line >= visible.to || cur.line < visible.from)
            going = setTimeout(operation(function(){extend(e);}), 150);
        }
      }

      function done(e) {
        clearTimeout(going);
        var cur = posFromMouse(e);
        if (cur) setSelectionUser(start, cur);
        e_preventDefault(e);
        focusInput();
        updateInput = true;
        move(); up();
      }
      var move = connect(document, "mousemove", operation(function(e) {
        clearTimeout(going);
        e_preventDefault(e);
        if (!ie && !e_button(e)) done(e);
        else extend(e);
      }), true);
      var up = connect(document, "mouseup", operation(done), true);
    }
    function onDoubleClick(e) {
      for (var n = e_target(e); n != wrapper; n = n.parentNode)
        if (n.parentNode == gutterText) return e_preventDefault(e);
      var start = posFromMouse(e);
      if (!start) return;
      lastDoubleClick = {time: +new Date, pos: start};
      e_preventDefault(e);
      selectWordAt(start);
    }
    function onDrop(e) {
      if (options.onDragEvent && options.onDragEvent(instance, addStop(e))) return;
      e.preventDefault();
      var pos = posFromMouse(e, true), files = e.dataTransfer.files;
      if (!pos || options.readOnly) return;
      if (files && files.length && window.FileReader && window.File) {
        function loadFile(file, i) {
          var reader = new FileReader;
          reader.onload = function() {
            text[i] = reader.result;
            if (++read == n) {
              pos = clipPos(pos);
              operation(function() {
                var end = replaceRange(text.join(""), pos, pos);
                setSelectionUser(pos, end);
              })();
            }
          };
          reader.readAsText(file);
        }
        var n = files.length, text = Array(n), read = 0;
        for (var i = 0; i < n; ++i) loadFile(files[i], i);
      }
      else {
        try {
          var text = e.dataTransfer.getData("Text");
          if (text) {
            compoundChange(function() {
              var curFrom = sel.from, curTo = sel.to;
              setSelectionUser(pos, pos);
              if (draggingText) replaceRange("", curFrom, curTo);
              replaceSelection(text);
              focusInput();
            });
          }
        }
        catch(e){}
      }
    }
    function onDragStart(e) {
      var txt = getSelection();
      e.dataTransfer.setData("Text", txt);
      
      // Use dummy image instead of default browsers image.
      if (gecko || chrome) {
        var img = document.createElement('img');
        img.scr = 'data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs='; //1x1 image
        e.dataTransfer.setDragImage(img, 0, 0);
      }
    }

    function doHandleBinding(bound, dropShift) {
      if (typeof bound == "string") {
        bound = commands[bound];
        if (!bound) return false;
      }
      var prevShift = shiftSelecting;
      try {
        if (options.readOnly) suppressEdits = true;
        if (dropShift) shiftSelecting = null;
        bound(instance);
      } catch(e) {
        if (e != Pass) throw e;
        return false;
      } finally {
        shiftSelecting = prevShift;
        suppressEdits = false;
      }
      return true;
    }
    function handleKeyBinding(e) {
      // Handle auto keymap transitions
      var startMap = getKeyMap(options.keyMap), next = startMap.auto;
      clearTimeout(maybeTransition);
      if (next && !isModifierKey(e)) maybeTransition = setTimeout(function() {
        if (getKeyMap(options.keyMap) == startMap) {
          options.keyMap = (next.call ? next.call(null, instance) : next);
        }
      }, 50);

      var name = keyNames[e_prop(e, "keyCode")], handled = false;
      if (name == null || e.altGraphKey) return false;
      if (e_prop(e, "altKey")) name = "Alt-" + name;
      if (e_prop(e, "ctrlKey")) name = "Ctrl-" + name;
      if (e_prop(e, "metaKey")) name = "Cmd-" + name;

      var stopped = false;
      function stop() { stopped = true; }

      if (e_prop(e, "shiftKey")) {
        handled = lookupKey("Shift-" + name, options.extraKeys, options.keyMap,
                            function(b) {return doHandleBinding(b, true);}, stop)
               || lookupKey(name, options.extraKeys, options.keyMap, function(b) {
                 if (typeof b == "string" && /^go[A-Z]/.test(b)) return doHandleBinding(b);
               }, stop);
      } else {
        handled = lookupKey(name, options.extraKeys, options.keyMap, doHandleBinding, stop);
      }
      if (stopped) handled = false;
      if (handled) {
        e_preventDefault(e);
        restartBlink();
        if (ie) { e.oldKeyCode = e.keyCode; e.keyCode = 0; }
      }
      return handled;
    }
    function handleCharBinding(e, ch) {
      var handled = lookupKey("'" + ch + "'", options.extraKeys,
                              options.keyMap, function(b) { return doHandleBinding(b, true); });
      if (handled) {
        e_preventDefault(e);
        restartBlink();
      }
      return handled;
    }

    var lastStoppedKey = null, maybeTransition;
    function onKeyDown(e) {
      if (!focused) onFocus();
      if (ie && e.keyCode == 27) { e.returnValue = false; }
      if (pollingFast) { if (readInput()) pollingFast = false; }
      if (options.onKeyEvent && options.onKeyEvent(instance, addStop(e))) return;
      var code = e_prop(e, "keyCode");
      // IE does strange things with escape.
      setShift(code == 16 || e_prop(e, "shiftKey"));
      // First give onKeyEvent option a chance to handle this.
      var handled = handleKeyBinding(e);
      if (window.opera) {
        lastStoppedKey = handled ? code : null;
        // Opera has no cut event... we try to at least catch the key combo
        if (!handled && code == 88 && e_prop(e, mac ? "metaKey" : "ctrlKey"))
          replaceSelection("");
      }
    }
    function onKeyPress(e) {
      if (pollingFast) readInput();
      if (options.onKeyEvent && options.onKeyEvent(instance, addStop(e))) return;
      var keyCode = e_prop(e, "keyCode"), charCode = e_prop(e, "charCode");
      if (window.opera && keyCode == lastStoppedKey) {lastStoppedKey = null; e_preventDefault(e); return;}
      if (((window.opera && (!e.which || e.which < 10)) || khtml) && handleKeyBinding(e)) return;
      var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
      if (options.electricChars && mode.electricChars && options.smartIndent && !options.readOnly) {
        if (mode.electricChars.indexOf(ch) > -1)
          setTimeout(operation(function() {indentLine(sel.to.line, "smart");}), 75);
      }
      if (handleCharBinding(e, ch)) return;
      fastPoll();
    }
    function onKeyUp(e) {
      if (options.onKeyEvent && options.onKeyEvent(instance, addStop(e))) return;
      if (e_prop(e, "keyCode") == 16) shiftSelecting = null;
    }

    function onFocus() {
      if (options.readOnly == "nocursor") return;
      if (!focused) {
        if (options.onFocus) options.onFocus(instance);
        focused = true;
        if (wrapper.className.search(/\bCodeMirror-focused\b/) == -1)
          wrapper.className += " CodeMirror-focused";
        if (!leaveInputAlone) resetInput(true);
      }
      slowPoll();
      restartBlink();
    }
    function onBlur() {
      if (focused) {
        if (options.onBlur) options.onBlur(instance);
        focused = false;
        if (bracketHighlighted)
          operation(function(){
            if (bracketHighlighted) { bracketHighlighted(); bracketHighlighted = null; }
          })();
        wrapper.className = wrapper.className.replace(" CodeMirror-focused", "");
      }
      clearInterval(blinker);
      setTimeout(function() {if (!focused) shiftSelecting = null;}, 150);
    }

    // Replace the range from from to to by the strings in newText.
    // Afterwards, set the selection to selFrom, selTo.
    function updateLines(from, to, newText, selFrom, selTo) {
      if (suppressEdits) return;
      if (history) {
        var old = [];
        doc.iter(from.line, to.line + 1, function(line) { old.push(line.text); });
        history.addChange(from.line, newText.length, old);
        while (history.done.length > options.undoDepth) history.done.shift();
      }
      updateLinesNoUndo(from, to, newText, selFrom, selTo);
    }
    function unredoHelper(from, to) {
      if (!from.length) return;
      var set = from.pop(), out = [];
      for (var i = set.length - 1; i >= 0; i -= 1) {
        var change = set[i];
        var replaced = [], end = change.start + change.added;
        doc.iter(change.start, end, function(line) { replaced.push(line.text); });
        out.push({start: change.start, added: change.old.length, old: replaced});
        var pos = clipPos({line: change.start + change.old.length - 1,
                           ch: editEnd(replaced[replaced.length-1], change.old[change.old.length-1])});
        updateLinesNoUndo({line: change.start, ch: 0}, {line: end - 1, ch: getLine(end-1).text.length}, change.old, pos, pos);
      }
      updateInput = true;
      to.push(out);
    }
    function undo() {unredoHelper(history.done, history.undone);}
    function redo() {unredoHelper(history.undone, history.done);}

    function updateLinesNoUndo(from, to, newText, selFrom, selTo) {
      if (suppressEdits) return;
      var recomputeMaxLength = false, maxLineLength = maxLine.length;
      if (!options.lineWrapping)
        doc.iter(from.line, to.line + 1, function(line) {
          if (!line.hidden && line.text.length == maxLineLength) {recomputeMaxLength = true; return true;}
        });
      if (from.line != to.line || newText.length > 1) gutterDirty = true;

      var nlines = to.line - from.line, firstLine = getLine(from.line), lastLine = getLine(to.line);
      // First adjust the line structure, taking some care to leave highlighting intact.
      if (from.ch == 0 && to.ch == 0 && newText[newText.length - 1] == "") {
        // This is a whole-line replace. Treated specially to make
        // sure line objects move the way they are supposed to.
        var added = [], prevLine = null;
        if (from.line) {
          prevLine = getLine(from.line - 1);
          prevLine.fixMarkEnds(lastLine);
        } else lastLine.fixMarkStarts();
        for (var i = 0, e = newText.length - 1; i < e; ++i)
          added.push(Line.inheritMarks(newText[i], prevLine));
        if (nlines) doc.remove(from.line, nlines, callbacks);
        if (added.length) doc.insert(from.line, added);
      } else if (firstLine == lastLine) {
        if (newText.length == 1)
          firstLine.replace(from.ch, to.ch, newText[0]);
        else {
          lastLine = firstLine.split(to.ch, newText[newText.length-1]);
          firstLine.replace(from.ch, null, newText[0]);
          firstLine.fixMarkEnds(lastLine);
          var added = [];
          for (var i = 1, e = newText.length - 1; i < e; ++i)
            added.push(Line.inheritMarks(newText[i], firstLine));
          added.push(lastLine);
          doc.insert(from.line + 1, added);
        }
      } else if (newText.length == 1) {
        firstLine.replace(from.ch, null, newText[0]);
        lastLine.replace(null, to.ch, "");
        firstLine.append(lastLine);
        doc.remove(from.line + 1, nlines, callbacks);
      } else {
        var added = [];
        firstLine.replace(from.ch, null, newText[0]);
        lastLine.replace(null, to.ch, newText[newText.length-1]);
        firstLine.fixMarkEnds(lastLine);
        for (var i = 1, e = newText.length - 1; i < e; ++i)
          added.push(Line.inheritMarks(newText[i], firstLine));
        if (nlines > 1) doc.remove(from.line + 1, nlines - 1, callbacks);
        doc.insert(from.line + 1, added);
      }
      if (options.lineWrapping) {
        var perLine = Math.max(5, scroller.clientWidth / charWidth() - 3);
        doc.iter(from.line, from.line + newText.length, function(line) {
          if (line.hidden) return;
          var guess = Math.ceil(line.text.length / perLine) || 1;
          if (guess != line.height) updateLineHeight(line, guess);
        });
      } else {
        doc.iter(from.line, from.line + newText.length, function(line) {
          var l = line.text;
          if (!line.hidden && l.length > maxLineLength) {
            maxLine = l; maxLineLength = l.length; maxWidth = null;
            recomputeMaxLength = false;
          }
        });
        if (recomputeMaxLength) maxLengthChanged = true;
      }

      // Add these lines to the work array, so that they will be
      // highlighted. Adjust work lines if lines were added/removed.
      var newWork = [], lendiff = newText.length - nlines - 1;
      for (var i = 0, l = work.length; i < l; ++i) {
        var task = work[i];
        if (task < from.line) newWork.push(task);
        else if (task > to.line) newWork.push(task + lendiff);
      }
      var hlEnd = from.line + Math.min(newText.length, 500);
      highlightLines(from.line, hlEnd);
      newWork.push(hlEnd);
      work = newWork;
      startWorker(100);
      // Remember that these lines changed, for updating the display
      changes.push({from: from.line, to: to.line + 1, diff: lendiff});
      var changeObj = {from: from, to: to, text: newText};
      if (textChanged) {
        for (var cur = textChanged; cur.next; cur = cur.next) {}
        cur.next = changeObj;
      } else textChanged = changeObj;

      // Update the selection
      function updateLine(n) {return n <= Math.min(to.line, to.line + lendiff) ? n : n + lendiff;}
      setSelection(selFrom, selTo, updateLine(sel.from.line), updateLine(sel.to.line));

      // Make sure the scroll-size div has the correct height.
      if (scroller.clientHeight)
        code.style.height = (doc.height * textHeight() + 2 * paddingTop()) + "px";
    }
    
    function computeMaxLength() {
      var maxLineLength = 0; 
      maxLine = ""; maxWidth = null;
      doc.iter(0, doc.size, function(line) {
        var l = line.text;
        if (!line.hidden && l.length > maxLineLength) {
          maxLineLength = l.length; maxLine = l;
        }
      });
      maxLengthChanged = false;
    }

    function replaceRange(code, from, to) {
      from = clipPos(from);
      if (!to) to = from; else to = clipPos(to);
      code = splitLines(code);
      function adjustPos(pos) {
        if (posLess(pos, from)) return pos;
        if (!posLess(to, pos)) return end;
        var line = pos.line + code.length - (to.line - from.line) - 1;
        var ch = pos.ch;
        if (pos.line == to.line)
          ch += code[code.length-1].length - (to.ch - (to.line == from.line ? from.ch : 0));
        return {line: line, ch: ch};
      }
      var end;
      replaceRange1(code, from, to, function(end1) {
        end = end1;
        return {from: adjustPos(sel.from), to: adjustPos(sel.to)};
      });
      return end;
    }
    function replaceSelection(code, collapse) {
      replaceRange1(splitLines(code), sel.from, sel.to, function(end) {
        if (collapse == "end") return {from: end, to: end};
        else if (collapse == "start") return {from: sel.from, to: sel.from};
        else return {from: sel.from, to: end};
      });
    }
    function replaceRange1(code, from, to, computeSel) {
      var endch = code.length == 1 ? code[0].length + from.ch : code[code.length-1].length;
      var newSel = computeSel({line: from.line + code.length - 1, ch: endch});
      updateLines(from, to, code, newSel.from, newSel.to);
    }

    function getRange(from, to) {
      var l1 = from.line, l2 = to.line;
      if (l1 == l2) return getLine(l1).text.slice(from.ch, to.ch);
      var code = [getLine(l1).text.slice(from.ch)];
      doc.iter(l1 + 1, l2, function(line) { code.push(line.text); });
      code.push(getLine(l2).text.slice(0, to.ch));
      return code.join("\n");
    }
    function getSelection() {
      return getRange(sel.from, sel.to);
    }

    var pollingFast = false; // Ensures slowPoll doesn't cancel fastPoll
    function slowPoll() {
      if (pollingFast) return;
      poll.set(options.pollInterval, function() {
        startOperation();
        readInput();
        if (focused) slowPoll();
        endOperation();
      });
    }
    function fastPoll() {
      var missed = false;
      pollingFast = true;
      function p() {
        startOperation();
        var changed = readInput();
        if (!changed && !missed) {missed = true; poll.set(60, p);}
        else {pollingFast = false; slowPoll();}
        endOperation();
      }
      poll.set(20, p);
    }

    // Previnput is a hack to work with IME. If we reset the textarea
    // on every change, that breaks IME. So we look for changes
    // compared to the previous content instead. (Modern browsers have
    // events that indicate IME taking place, but these are not widely
    // supported or compatible enough yet to rely on.)
    var prevInput = "";
    function readInput() {
      if (leaveInputAlone || !focused || hasSelection(input) || options.readOnly) return false;
      var text = input.value;
      if (text == prevInput) return false;
      shiftSelecting = null;
      var same = 0, l = Math.min(prevInput.length, text.length);
      while (same < l && prevInput[same] == text[same]) ++same;
      if (same < prevInput.length)
        sel.from = {line: sel.from.line, ch: sel.from.ch - (prevInput.length - same)};
      else if (overwrite && posEq(sel.from, sel.to))
        sel.to = {line: sel.to.line, ch: Math.min(getLine(sel.to.line).text.length, sel.to.ch + (text.length - same))};
      replaceSelection(text.slice(same), "end");
      if (text.length > 1000) { input.value = prevInput = ""; }
      else prevInput = text;
      return true;
    }
    function resetInput(user) {
      if (!posEq(sel.from, sel.to)) {
        prevInput = "";
        input.value = getSelection();
        selectInput(input);
      } else if (user) prevInput = input.value = "";
    }

    function focusInput() {
      if (options.readOnly != "nocursor") input.focus();
    }

    function scrollEditorIntoView() {
      if (!cursor.getBoundingClientRect) return;
      var rect = cursor.getBoundingClientRect();
      // IE returns bogus coordinates when the instance sits inside of an iframe and the cursor is hidden
      if (ie && rect.top == rect.bottom) return;
      var winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
      if (rect.top < 0 || rect.bottom > winH) cursor.scrollIntoView();
    }
    function scrollCursorIntoView() {
      var cursor = localCoords(sel.inverted ? sel.from : sel.to);
      var x = options.lineWrapping ? Math.min(cursor.x, lineSpace.offsetWidth) : cursor.x;
      return scrollIntoView(x, cursor.y, x, cursor.yBot);
    }
    function scrollIntoView(x1, y1, x2, y2) {
      var pl = paddingLeft(), pt = paddingTop();
      y1 += pt; y2 += pt; x1 += pl; x2 += pl;
      var screen = scroller.clientHeight, screentop = scroller.scrollTop, scrolled = false, result = true;
      if (y1 < screentop) {scroller.scrollTop = Math.max(0, y1); scrolled = true;}
      else if (y2 > screentop + screen) {scroller.scrollTop = y2 - screen; scrolled = true;}

      var screenw = scroller.clientWidth, screenleft = scroller.scrollLeft;
      var gutterw = options.fixedGutter ? gutter.clientWidth : 0;
      var atLeft = x1 < gutterw + pl + 10;
      if (x1 < screenleft + gutterw || atLeft) {
        if (atLeft) x1 = 0;
        scroller.scrollLeft = Math.max(0, x1 - 10 - gutterw);
        scrolled = true;
      }
      else if (x2 > screenw + screenleft - 3) {
        scroller.scrollLeft = x2 + 10 - screenw;
        scrolled = true;
        if (x2 > code.clientWidth) result = false;
      }
      if (scrolled && options.onScroll) options.onScroll(instance);
      return result;
    }

    function visibleLines() {
      var lh = textHeight(), top = scroller.scrollTop - paddingTop();
      var fromHeight = Math.max(0, Math.floor(top / lh));
      var toHeight = Math.ceil((top + scroller.clientHeight) / lh);
      return {from: lineAtHeight(doc, fromHeight),
              to: lineAtHeight(doc, toHeight)};
    }
    // Uses a set of changes plus the current scroll position to
    // determine which DOM updates have to be made, and makes the
    // updates.
    function updateDisplay(changes, suppressCallback) {
      if (!scroller.clientWidth) {
        showingFrom = showingTo = displayOffset = 0;
        return;
      }
      // Compute the new visible window
      var visible = visibleLines();
      // Bail out if the visible area is already rendered and nothing changed.
      if (changes !== true && changes.length == 0 && visible.from > showingFrom && visible.to < showingTo) return;
      var from = Math.max(visible.from - 100, 0), to = Math.min(doc.size, visible.to + 100);
      if (showingFrom < from && from - showingFrom < 20) from = showingFrom;
      if (showingTo > to && showingTo - to < 20) to = Math.min(doc.size, showingTo);

      // Create a range of theoretically intact lines, and punch holes
      // in that using the change info.
      var intact = changes === true ? [] :
        computeIntact([{from: showingFrom, to: showingTo, domStart: 0}], changes);
      // Clip off the parts that won't be visible
      var intactLines = 0;
      for (var i = 0; i < intact.length; ++i) {
        var range = intact[i];
        if (range.from < from) {range.domStart += (from - range.from); range.from = from;}
        if (range.to > to) range.to = to;
        if (range.from >= range.to) intact.splice(i--, 1);
        else intactLines += range.to - range.from;
      }
      if (intactLines == to - from && from == showingFrom && to == showingTo) return;
      intact.sort(function(a, b) {return a.domStart - b.domStart;});

      var th = textHeight(), gutterDisplay = gutter.style.display;
      lineDiv.style.display = "none";
      patchDisplay(from, to, intact);
      lineDiv.style.display = gutter.style.display = "";

      // Position the mover div to align with the lines it's supposed
      // to be showing (which will cover the visible display)
      var different = from != showingFrom || to != showingTo || lastSizeC != scroller.clientHeight + th;
      // This is just a bogus formula that detects when the editor is
      // resized or the font size changes.
      if (different) lastSizeC = scroller.clientHeight + th;
      showingFrom = from; showingTo = to;
      displayOffset = heightAtLine(doc, from);
      mover.style.top = (displayOffset * th) + "px";
      if (scroller.clientHeight)
        code.style.height = (doc.height * th + 2 * paddingTop()) + "px";

      // Since this is all rather error prone, it is honoured with the
      // only assertion in the whole file.
      if (lineDiv.childNodes.length != showingTo - showingFrom)
        throw new Error("BAD PATCH! " + JSON.stringify(intact) + " size=" + (showingTo - showingFrom) +
                        " nodes=" + lineDiv.childNodes.length);

      function checkHeights() {
        maxWidth = scroller.clientWidth;
        var curNode = lineDiv.firstChild, heightChanged = false;
        doc.iter(showingFrom, showingTo, function(line) {
          if (!line.hidden) {
            var height = Math.round(curNode.offsetHeight / th) || 1;
            if (line.height != height) {
              updateLineHeight(line, height);
              gutterDirty = heightChanged = true;
            }
          }
          curNode = curNode.nextSibling;
        });
        if (heightChanged)
          code.style.height = (doc.height * th + 2 * paddingTop()) + "px";
        return heightChanged;
      }

      if (options.lineWrapping) {
        checkHeights();
      } else {
        if (maxWidth == null) maxWidth = stringWidth(maxLine);
        if (maxWidth > scroller.clientWidth) {
          lineSpace.style.width = maxWidth + "px";
          // Needed to prevent odd wrapping/hiding of widgets placed in here.
          code.style.width = "";
          code.style.width = scroller.scrollWidth + "px";
        } else {
          lineSpace.style.width = code.style.width = "";
        }
      }

      gutter.style.display = gutterDisplay;
      if (different || gutterDirty) {
        // If the gutter grew in size, re-check heights. If those changed, re-draw gutter.
        updateGutter() && options.lineWrapping && checkHeights() && updateGutter();
      }
      updateSelection();
      if (!suppressCallback && options.onUpdate) options.onUpdate(instance);
      return true;
    }

    function computeIntact(intact, changes) {
      for (var i = 0, l = changes.length || 0; i < l; ++i) {
        var change = changes[i], intact2 = [], diff = change.diff || 0;
        for (var j = 0, l2 = intact.length; j < l2; ++j) {
          var range = intact[j];
          if (change.to <= range.from && change.diff)
            intact2.push({from: range.from + diff, to: range.to + diff,
                          domStart: range.domStart});
          else if (change.to <= range.from || change.from >= range.to)
            intact2.push(range);
          else {
            if (change.from > range.from)
              intact2.push({from: range.from, to: change.from, domStart: range.domStart});
            if (change.to < range.to)
              intact2.push({from: change.to + diff, to: range.to + diff,
                            domStart: range.domStart + (change.to - range.from)});
          }
        }
        intact = intact2;
      }
      return intact;
    }

    function patchDisplay(from, to, intact) {
      // The first pass removes the DOM nodes that aren't intact.
      if (!intact.length) lineDiv.innerHTML = "";
      else {
        function killNode(node) {
          var tmp = node.nextSibling;
          node.parentNode.removeChild(node);
          return tmp;
        }
        var domPos = 0, curNode = lineDiv.firstChild, n;
        for (var i = 0; i < intact.length; ++i) {
          var cur = intact[i];
          while (cur.domStart > domPos) {curNode = killNode(curNode); domPos++;}
          for (var j = 0, e = cur.to - cur.from; j < e; ++j) {curNode = curNode.nextSibling; domPos++;}
        }
        while (curNode) curNode = killNode(curNode);
      }
      // This pass fills in the lines that actually changed.
      var nextIntact = intact.shift(), curNode = lineDiv.firstChild, j = from;
      var scratch = document.createElement("div");
      doc.iter(from, to, function(line) {
        if (nextIntact && nextIntact.to == j) nextIntact = intact.shift();
        if (!nextIntact || nextIntact.from > j) {
          if (line.hidden) var html = scratch.innerHTML = "<pre></pre>";
          else {
            var html = '<pre' + (line.className ? ' class="' + line.className + '"' : '') + '>'
              + line.getHTML(makeTab) + '</pre>';
            // Kludge to make sure the styled element lies behind the selection (by z-index)
            if (line.bgClassName)
              html = '<div style="position: relative"><pre class="' + line.bgClassName +
              '" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2">&#160;</pre>' + html + "</div>";
          }
          scratch.innerHTML = html;
          lineDiv.insertBefore(scratch.firstChild, curNode);
        } else {
          curNode = curNode.nextSibling;
        }
        ++j;
      });
    }

    function updateGutter() {
      if (!options.gutter && !options.lineNumbers) return;
      var hText = mover.offsetHeight, hEditor = scroller.clientHeight;
      gutter.style.height = (hText - hEditor < 2 ? hEditor : hText) + "px";
      var html = [], i = showingFrom, normalNode;
      doc.iter(showingFrom, Math.max(showingTo, showingFrom + 1), function(line) {
        if (line.hidden) {
          html.push("<pre></pre>");
        } else {
          var marker = line.gutterMarker;
          var text = options.lineNumbers ? i + options.firstLineNumber : null;
          if (marker && marker.text)
            text = marker.text.replace("%N%", text != null ? text : "");
          else if (text == null)
            text = "\u00a0";
          html.push((marker && marker.style ? '<pre class="' + marker.style + '">' : "<pre>"), text);
          for (var j = 1; j < line.height; ++j) html.push("<br/>&#160;");
          html.push("</pre>");
          if (!marker) normalNode = i;
        }
        ++i;
      });
      gutter.style.display = "none";
      gutterText.innerHTML = html.join("");
      // Make sure scrolling doesn't cause number gutter size to pop
      if (normalNode != null) {
        var node = gutterText.childNodes[normalNode - showingFrom];
        var minwidth = String(doc.size).length, val = eltText(node), pad = "";
        while (val.length + pad.length < minwidth) pad += "\u00a0";
        if (pad) node.insertBefore(document.createTextNode(pad), node.firstChild);
      }
      gutter.style.display = "";
      var resized = Math.abs((parseInt(lineSpace.style.marginLeft) || 0) - gutter.offsetWidth) > 2;
      lineSpace.style.marginLeft = gutter.offsetWidth + "px";
      gutterDirty = false;
      return resized;
    }
    function updateSelection() {
      var collapsed = posEq(sel.from, sel.to);
      var fromPos = localCoords(sel.from, true);
      var toPos = collapsed ? fromPos : localCoords(sel.to, true);
      var headPos = sel.inverted ? fromPos : toPos, th = textHeight();
      var wrapOff = eltOffset(wrapper), lineOff = eltOffset(lineDiv);
      inputDiv.style.top = Math.max(0, Math.min(scroller.offsetHeight, headPos.y + lineOff.top - wrapOff.top)) + "px";
      inputDiv.style.left = Math.max(0, Math.min(scroller.offsetWidth, headPos.x + lineOff.left - wrapOff.left)) + "px";
      if (collapsed) {
        cursor.style.top = headPos.y + "px";
        cursor.style.left = (options.lineWrapping ? Math.min(headPos.x, lineSpace.offsetWidth) : headPos.x) + "px";
        cursor.style.display = "";
        selectionDiv.style.display = "none";
      } else {
        var sameLine = fromPos.y == toPos.y, html = "";
        var clientWidth = lineSpace.clientWidth || lineSpace.offsetWidth;
        var clientHeight = lineSpace.clientHeight || lineSpace.offsetHeight;
        function add(left, top, right, height) {
          var rstyle = quirksMode ? "width: " + (!right ? clientWidth : clientWidth - right - left) + "px"
                                  : "right: " + right + "px";
          html += '<div class="CodeMirror-selected" style="position: absolute; left: ' + left +
            'px; top: ' + top + 'px; ' + rstyle + '; height: ' + height + 'px"></div>';
        }
        if (sel.from.ch && fromPos.y >= 0) {
          var right = sameLine ? clientWidth - toPos.x : 0;
          add(fromPos.x, fromPos.y, right, th);
        }
        var middleStart = Math.max(0, fromPos.y + (sel.from.ch ? th : 0));
        var middleHeight = Math.min(toPos.y, clientHeight) - middleStart;
        if (middleHeight > 0.2 * th)
          add(0, middleStart, 0, middleHeight);
        if ((!sameLine || !sel.from.ch) && toPos.y < clientHeight - .5 * th)
          add(0, toPos.y, clientWidth - toPos.x, th);
        selectionDiv.innerHTML = html;
        cursor.style.display = "none";
        selectionDiv.style.display = "";
      }
    }

    function setShift(val) {
      if (val) shiftSelecting = shiftSelecting || (sel.inverted ? sel.to : sel.from);
      else shiftSelecting = null;
    }
    function setSelectionUser(from, to) {
      var sh = shiftSelecting && clipPos(shiftSelecting);
      if (sh) {
        if (posLess(sh, from)) from = sh;
        else if (posLess(to, sh)) to = sh;
      }
      setSelection(from, to);
      userSelChange = true;
    }
    // Update the selection. Last two args are only used by
    // updateLines, since they have to be expressed in the line
    // numbers before the update.
    function setSelection(from, to, oldFrom, oldTo) {
      goalColumn = null;
      if (oldFrom == null) {oldFrom = sel.from.line; oldTo = sel.to.line;}
      if (posEq(sel.from, from) && posEq(sel.to, to)) return;
      if (posLess(to, from)) {var tmp = to; to = from; from = tmp;}

      // Skip over hidden lines.
      if (from.line != oldFrom) {
        var from1 = skipHidden(from, oldFrom, sel.from.ch);
        // If there is no non-hidden line left, force visibility on current line
        if (!from1) setLineHidden(from.line, false);
        else from = from1;
      }
      if (to.line != oldTo) to = skipHidden(to, oldTo, sel.to.ch);

      if (posEq(from, to)) sel.inverted = false;
      else if (posEq(from, sel.to)) sel.inverted = false;
      else if (posEq(to, sel.from)) sel.inverted = true;

      if (options.autoClearEmptyLines && posEq(sel.from, sel.to)) {
        var head = sel.inverted ? from : to;
        if (head.line != sel.from.line && sel.from.line < doc.size) {
          var oldLine = getLine(sel.from.line);
          if (/^\s+$/.test(oldLine.text))
            setTimeout(operation(function() {
              if (oldLine.parent && /^\s+$/.test(oldLine.text)) {
                var no = lineNo(oldLine);
                replaceRange("", {line: no, ch: 0}, {line: no, ch: oldLine.text.length});
              }
            }, 10));
        }
      }

      sel.from = from; sel.to = to;
      selectionChanged = true;
    }
    function skipHidden(pos, oldLine, oldCh) {
      function getNonHidden(dir) {
        var lNo = pos.line + dir, end = dir == 1 ? doc.size : -1;
        while (lNo != end) {
          var line = getLine(lNo);
          if (!line.hidden) {
            var ch = pos.ch;
            if (toEnd || ch > oldCh || ch > line.text.length) ch = line.text.length;
            return {line: lNo, ch: ch};
          }
          lNo += dir;
        }
      }
      var line = getLine(pos.line);
      var toEnd = pos.ch == line.text.length && pos.ch != oldCh;
      if (!line.hidden) return pos;
      if (pos.line >= oldLine) return getNonHidden(1) || getNonHidden(-1);
      else return getNonHidden(-1) || getNonHidden(1);
    }
    function setCursor(line, ch, user) {
      var pos = clipPos({line: line, ch: ch || 0});
      (user ? setSelectionUser : setSelection)(pos, pos);
    }

    function clipLine(n) {return Math.max(0, Math.min(n, doc.size-1));}
    function clipPos(pos) {
      if (pos.line < 0) return {line: 0, ch: 0};
      if (pos.line >= doc.size) return {line: doc.size-1, ch: getLine(doc.size-1).text.length};
      var ch = pos.ch, linelen = getLine(pos.line).text.length;
      if (ch == null || ch > linelen) return {line: pos.line, ch: linelen};
      else if (ch < 0) return {line: pos.line, ch: 0};
      else return pos;
    }

    function findPosH(dir, unit) {
      var end = sel.inverted ? sel.from : sel.to, line = end.line, ch = end.ch;
      var lineObj = getLine(line);
      function findNextLine() {
        for (var l = line + dir, e = dir < 0 ? -1 : doc.size; l != e; l += dir) {
          var lo = getLine(l);
          if (!lo.hidden) { line = l; lineObj = lo; return true; }
        }
      }
      function moveOnce(boundToLine) {
        if (ch == (dir < 0 ? 0 : lineObj.text.length)) {
          if (!boundToLine && findNextLine()) ch = dir < 0 ? lineObj.text.length : 0;
          else return false;
        } else ch += dir;
        return true;
      }
      if (unit == "char") moveOnce();
      else if (unit == "column") moveOnce(true);
      else if (unit == "word") {
        var sawWord = false;
        for (;;) {
          if (dir < 0) if (!moveOnce()) break;
          if (isWordChar(lineObj.text.charAt(ch))) sawWord = true;
          else if (sawWord) {if (dir < 0) {dir = 1; moveOnce();} break;}
          if (dir > 0) if (!moveOnce()) break;
        }
      }
      return {line: line, ch: ch};
    }
    function moveH(dir, unit) {
      var pos = dir < 0 ? sel.from : sel.to;
      if (shiftSelecting || posEq(sel.from, sel.to)) pos = findPosH(dir, unit);
      setCursor(pos.line, pos.ch, true);
    }
    function deleteH(dir, unit) {
      if (!posEq(sel.from, sel.to)) replaceRange("", sel.from, sel.to);
      else if (dir < 0) replaceRange("", findPosH(dir, unit), sel.to);
      else replaceRange("", sel.from, findPosH(dir, unit));
      userSelChange = true;
    }
    var goalColumn = null;
    function moveV(dir, unit) {
      var dist = 0, pos = localCoords(sel.inverted ? sel.from : sel.to, true);
      if (goalColumn != null) pos.x = goalColumn;
      if (unit == "page") dist = Math.min(scroller.clientHeight, window.innerHeight || document.documentElement.clientHeight);
      else if (unit == "line") dist = textHeight();
      var target = coordsChar(pos.x, pos.y + dist * dir + 2);
      if (unit == "page") scroller.scrollTop += localCoords(target, true).y - pos.y;
      setCursor(target.line, target.ch, true);
      goalColumn = pos.x;
    }

    function selectWordAt(pos) {
      var line = getLine(pos.line).text;
      var start = pos.ch, end = pos.ch;
      while (start > 0 && isWordChar(line.charAt(start - 1))) --start;
      while (end < line.length && isWordChar(line.charAt(end))) ++end;
      setSelectionUser({line: pos.line, ch: start}, {line: pos.line, ch: end});
    }
    function selectLine(line) {
      setSelectionUser({line: line, ch: 0}, clipPos({line: line + 1, ch: 0}));
    }
    function indentSelected(mode) {
      if (posEq(sel.from, sel.to)) return indentLine(sel.from.line, mode);
      var e = sel.to.line - (sel.to.ch ? 0 : 1);
      for (var i = sel.from.line; i <= e; ++i) indentLine(i, mode);
    }

    function indentLine(n, how) {
      if (!how) how = "add";
      if (how == "smart") {
        if (!mode.indent) how = "prev";
        else var state = getStateBefore(n);
      }

      var line = getLine(n), curSpace = line.indentation(options.tabSize),
          curSpaceString = line.text.match(/^\s*/)[0], indentation;
      if (how == "prev") {
        if (n) indentation = getLine(n-1).indentation(options.tabSize);
        else indentation = 0;
      }
      else if (how == "smart") indentation = mode.indent(state, line.text.slice(curSpaceString.length), line.text);
      else if (how == "add") indentation = curSpace + options.indentUnit;
      else if (how == "subtract") indentation = curSpace - options.indentUnit;
      indentation = Math.max(0, indentation);
      var diff = indentation - curSpace;

      if (!diff) {
        if (sel.from.line != n && sel.to.line != n) return;
        var indentString = curSpaceString;
      }
      else {
        var indentString = "", pos = 0;
        if (options.indentWithTabs)
          for (var i = Math.floor(indentation / options.tabSize); i; --i) {pos += options.tabSize; indentString += "\t";}
        while (pos < indentation) {++pos; indentString += " ";}
      }

      replaceRange(indentString, {line: n, ch: 0}, {line: n, ch: curSpaceString.length});
    }

    function loadMode() {
      mode = CodeMirror.getMode(options, options.mode);
      doc.iter(0, doc.size, function(line) { line.stateAfter = null; });
      work = [0];
      startWorker();
    }
    function gutterChanged() {
      var visible = options.gutter || options.lineNumbers;
      gutter.style.display = visible ? "" : "none";
      if (visible) gutterDirty = true;
      else lineDiv.parentNode.style.marginLeft = 0;
    }
    function wrappingChanged(from, to) {
      if (options.lineWrapping) {
        wrapper.className += " CodeMirror-wrap";
        var perLine = scroller.clientWidth / charWidth() - 3;
        doc.iter(0, doc.size, function(line) {
          if (line.hidden) return;
          var guess = Math.ceil(line.text.length / perLine) || 1;
          if (guess != 1) updateLineHeight(line, guess);
        });
        lineSpace.style.width = code.style.width = "";
      } else {
        wrapper.className = wrapper.className.replace(" CodeMirror-wrap", "");
        maxWidth = null; maxLine = "";
        doc.iter(0, doc.size, function(line) {
          if (line.height != 1 && !line.hidden) updateLineHeight(line, 1);
          if (line.text.length > maxLine.length) maxLine = line.text;
        });
      }
      changes.push({from: 0, to: doc.size});
    }
    function makeTab(col) {
      var w = options.tabSize - col % options.tabSize, cached = tabCache[w];
      if (cached) return cached;
      for (var str = '<span class="cm-tab">', i = 0; i < w; ++i) str += " ";
      return (tabCache[w] = {html: str + "</span>", width: w});
    }
    function themeChanged() {
      scroller.className = scroller.className.replace(/\s*cm-s-\S+/g, "") +
        options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    }
    function keyMapChanged() {
      var style = keyMap[options.keyMap].style;
      wrapper.className = wrapper.className.replace(/\s*cm-keymap-\S+/g, "") +
        (style ? " cm-keymap-" + style : "");
    }

    function TextMarker() { this.set = []; }
    TextMarker.prototype.clear = operation(function() {
      var min = Infinity, max = -Infinity;
      for (var i = 0, e = this.set.length; i < e; ++i) {
        var line = this.set[i], mk = line.marked;
        if (!mk || !line.parent) continue;
        var lineN = lineNo(line);
        min = Math.min(min, lineN); max = Math.max(max, lineN);
        for (var j = 0; j < mk.length; ++j)
          if (mk[j].marker == this) mk.splice(j--, 1);
      }
      if (min != Infinity)
        changes.push({from: min, to: max + 1});
    });
    TextMarker.prototype.find = function() {
      var from, to;
      for (var i = 0, e = this.set.length; i < e; ++i) {
        var line = this.set[i], mk = line.marked;
        for (var j = 0; j < mk.length; ++j) {
          var mark = mk[j];
          if (mark.marker == this) {
            if (mark.from != null || mark.to != null) {
              var found = lineNo(line);
              if (found != null) {
                if (mark.from != null) from = {line: found, ch: mark.from};
                if (mark.to != null) to = {line: found, ch: mark.to};
              }
            }
          }
        }
      }
      return {from: from, to: to};
    };

    function markText(from, to, className) {
      from = clipPos(from); to = clipPos(to);
      var tm = new TextMarker();
      if (!posLess(from, to)) return tm;
      function add(line, from, to, className) {
        getLine(line).addMark(new MarkedText(from, to, className, tm));
      }
      if (from.line == to.line) add(from.line, from.ch, to.ch, className);
      else {
        add(from.line, from.ch, null, className);
        for (var i = from.line + 1, e = to.line; i < e; ++i)
          add(i, null, null, className);
        add(to.line, null, to.ch, className);
      }
      changes.push({from: from.line, to: to.line + 1});
      return tm;
    }

    function setBookmark(pos) {
      pos = clipPos(pos);
      var bm = new Bookmark(pos.ch);
      getLine(pos.line).addMark(bm);
      return bm;
    }

    function findMarksAt(pos) {
      pos = clipPos(pos);
      var markers = [], marked = getLine(pos.line).marked;
      if (!marked) return markers;
      for (var i = 0, e = marked.length; i < e; ++i) {
        var m = marked[i];
        if ((m.from == null || m.from <= pos.ch) &&
            (m.to == null || m.to >= pos.ch))
          markers.push(m.marker || m);
      }
      return markers;
    }

    function addGutterMarker(line, text, className) {
      if (typeof line == "number") line = getLine(clipLine(line));
      line.gutterMarker = {text: text, style: className};
      gutterDirty = true;
      return line;
    }
    function removeGutterMarker(line) {
      if (typeof line == "number") line = getLine(clipLine(line));
      line.gutterMarker = null;
      gutterDirty = true;
    }

    function changeLine(handle, op) {
      var no = handle, line = handle;
      if (typeof handle == "number") line = getLine(clipLine(handle));
      else no = lineNo(handle);
      if (no == null) return null;
      if (op(line, no)) changes.push({from: no, to: no + 1});
      else return null;
      return line;
    }
    function setLineClass(handle, className, bgClassName) {
      return changeLine(handle, function(line) {
        if (line.className != className || line.bgClassName != bgClassName) {
          line.className = className;
          line.bgClassName = bgClassName;
          return true;
        }
      });
    }
    function setLineHidden(handle, hidden) {
      return changeLine(handle, function(line, no) {
        if (line.hidden != hidden) {
          line.hidden = hidden;
          if (!options.lineWrapping) {
            var l = line.text;
            if (hidden && l.length == maxLine.length) {
              maxLengthChanged = true;
            }
            else if (!hidden && l.length > maxLine.length) {
              maxLine = l; maxWidth = null;
              maxLengthChanged = false;
            }
          }
          updateLineHeight(line, hidden ? 0 : 1);
          var fline = sel.from.line, tline = sel.to.line;
          if (hidden && (fline == no || tline == no)) {
            var from = fline == no ? skipHidden({line: fline, ch: 0}, fline, 0) : sel.from;
            var to = tline == no ? skipHidden({line: tline, ch: 0}, tline, 0) : sel.to;
            // Can't hide the last visible line, we'd have no place to put the cursor
            if (!to) return;
            setSelection(from, to);
          }
          return (gutterDirty = true);
        }
      });
    }

    function lineInfo(line) {
      if (typeof line == "number") {
        if (!isLine(line)) return null;
        var n = line;
        line = getLine(line);
        if (!line) return null;
      }
      else {
        var n = lineNo(line);
        if (n == null) return null;
      }
      var marker = line.gutterMarker;
      return {line: n, handle: line, text: line.text, markerText: marker && marker.text,
              markerClass: marker && marker.style, lineClass: line.className, bgClass: line.bgClassName};
    }

    function stringWidth(str) {
      measure.innerHTML = "<pre><span>x</span></pre>";
      measure.firstChild.firstChild.firstChild.nodeValue = str;
      return measure.firstChild.firstChild.offsetWidth || 10;
    }
    // These are used to go from pixel positions to character
    // positions, taking varying character widths into account.
    function charFromX(line, x) {
      if (x <= 0) return 0;
      var lineObj = getLine(line), text = lineObj.text;
      function getX(len) {
        return measureLine(lineObj, len).left;
      }
      var from = 0, fromX = 0, to = text.length, toX;
      // Guess a suitable upper bound for our search.
      var estimated = Math.min(to, Math.ceil(x / charWidth()));
      for (;;) {
        var estX = getX(estimated);
        if (estX <= x && estimated < to) estimated = Math.min(to, Math.ceil(estimated * 1.2));
        else {toX = estX; to = estimated; break;}
      }
      if (x > toX) return to;
      // Try to guess a suitable lower bound as well.
      estimated = Math.floor(to * 0.8); estX = getX(estimated);
      if (estX < x) {from = estimated; fromX = estX;}
      // Do a binary search between these bounds.
      for (;;) {
        if (to - from <= 1) return (toX - x > x - fromX) ? from : to;
        var middle = Math.ceil((from + to) / 2), middleX = getX(middle);
        if (middleX > x) {to = middle; toX = middleX;}
        else {from = middle; fromX = middleX;}
      }
    }

    var tempId = "CodeMirror-temp-" + Math.floor(Math.random() * 0xffffff).toString(16);
    function measureLine(line, ch) {
      if (ch == 0) return {top: 0, left: 0};
      var wbr = options.lineWrapping && ch < line.text.length &&
                spanAffectsWrapping.test(line.text.slice(ch - 1, ch + 1));
      measure.innerHTML = "<pre>" + line.getHTML(makeTab, ch, tempId, wbr) + "</pre>";
      var elt = document.getElementById(tempId);
      var top = elt.offsetTop, left = elt.offsetLeft;
      // Older IEs report zero offsets for spans directly after a wrap
      if (ie && top == 0 && left == 0) {
        var backup = document.createElement("span");
        backup.innerHTML = "x";
        elt.parentNode.insertBefore(backup, elt.nextSibling);
        top = backup.offsetTop;
      }
      return {top: top, left: left};
    }
    function localCoords(pos, inLineWrap) {
      var x, lh = textHeight(), y = lh * (heightAtLine(doc, pos.line) - (inLineWrap ? displayOffset : 0));
      if (pos.ch == 0) x = 0;
      else {
        var sp = measureLine(getLine(pos.line), pos.ch);
        x = sp.left;
        if (options.lineWrapping) y += Math.max(0, sp.top);
      }
      return {x: x, y: y, yBot: y + lh};
    }
    // Coords must be lineSpace-local
    function coordsChar(x, y) {
      if (y < 0) y = 0;
      var th = textHeight(), cw = charWidth(), heightPos = displayOffset + Math.floor(y / th);
      var lineNo = lineAtHeight(doc, heightPos);
      if (lineNo >= doc.size) return {line: doc.size - 1, ch: getLine(doc.size - 1).text.length};
      var lineObj = getLine(lineNo), text = lineObj.text;
      var tw = options.lineWrapping, innerOff = tw ? heightPos - heightAtLine(doc, lineNo) : 0;
      if (x <= 0 && innerOff == 0) return {line: lineNo, ch: 0};
      function getX(len) {
        var sp = measureLine(lineObj, len);
        if (tw) {
          var off = Math.round(sp.top / th);
          return Math.max(0, sp.left + (off - innerOff) * scroller.clientWidth);
        }
        return sp.left;
      }
      var from = 0, fromX = 0, to = text.length, toX;
      // Guess a suitable upper bound for our search.
      var estimated = Math.min(to, Math.ceil((x + innerOff * scroller.clientWidth * .9) / cw));
      for (;;) {
        var estX = getX(estimated);
        if (estX <= x && estimated < to) estimated = Math.min(to, Math.ceil(estimated * 1.2));
        else {toX = estX; to = estimated; break;}
      }
      if (x > toX) return {line: lineNo, ch: to};
      // Try to guess a suitable lower bound as well.
      estimated = Math.floor(to * 0.8); estX = getX(estimated);
      if (estX < x) {from = estimated; fromX = estX;}
      // Do a binary search between these bounds.
      for (;;) {
        if (to - from <= 1) return {line: lineNo, ch: (toX - x > x - fromX) ? from : to};
        var middle = Math.ceil((from + to) / 2), middleX = getX(middle);
        if (middleX > x) {to = middle; toX = middleX;}
        else {from = middle; fromX = middleX;}
      }
    }
    function pageCoords(pos) {
      var local = localCoords(pos, true), off = eltOffset(lineSpace);
      return {x: off.left + local.x, y: off.top + local.y, yBot: off.top + local.yBot};
    }

    var cachedHeight, cachedHeightFor, measureText;
    function textHeight() {
      if (measureText == null) {
        measureText = "<pre>";
        for (var i = 0; i < 49; ++i) measureText += "x<br/>";
        measureText += "x</pre>";
      }
      var offsetHeight = lineDiv.clientHeight;
      if (offsetHeight == cachedHeightFor) return cachedHeight;
      cachedHeightFor = offsetHeight;
      measure.innerHTML = measureText;
      cachedHeight = measure.firstChild.offsetHeight / 50 || 1;
      measure.innerHTML = "";
      return cachedHeight;
    }
    var cachedWidth, cachedWidthFor = 0;
    function charWidth() {
      if (scroller.clientWidth == cachedWidthFor) return cachedWidth;
      cachedWidthFor = scroller.clientWidth;
      return (cachedWidth = stringWidth("x"));
    }
    function paddingTop() {return lineSpace.offsetTop;}
    function paddingLeft() {return lineSpace.offsetLeft;}

    function posFromMouse(e, liberal) {
      var offW = eltOffset(scroller, true), x, y;
      // Fails unpredictably on IE[67] when mouse is dragged around quickly.
      try { x = e.clientX; y = e.clientY; } catch (e) { return null; }
      // This is a mess of a heuristic to try and determine whether a
      // scroll-bar was clicked or not, and to return null if one was
      // (and !liberal).
      if (!liberal && (x - offW.left > scroller.clientWidth || y - offW.top > scroller.clientHeight))
        return null;
      var offL = eltOffset(lineSpace, true);
      return coordsChar(x - offL.left, y - offL.top);
    }
    function onContextMenu(e) {
      var pos = posFromMouse(e), scrollPos = scroller.scrollTop;
      if (!pos || window.opera) return; // Opera is difficult.
      if (posEq(sel.from, sel.to) || posLess(pos, sel.from) || !posLess(pos, sel.to))
        operation(setCursor)(pos.line, pos.ch);

      var oldCSS = input.style.cssText;
      inputDiv.style.position = "absolute";
      input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) +
        "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: white; " +
        "border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
      leaveInputAlone = true;
      var val = input.value = getSelection();
      focusInput();
      selectInput(input);
      function rehide() {
        var newVal = splitLines(input.value).join("\n");
        if (newVal != val) operation(replaceSelection)(newVal, "end");
        inputDiv.style.position = "relative";
        input.style.cssText = oldCSS;
        if (ie_lt9) scroller.scrollTop = scrollPos;
        leaveInputAlone = false;
        resetInput(true);
        slowPoll();
      }

      if (gecko) {
        e_stop(e);
        var mouseup = connect(window, "mouseup", function() {
          mouseup();
          setTimeout(rehide, 20);
        }, true);
      } else {
        setTimeout(rehide, 50);
      }
    }

    // Cursor-blinking
    function restartBlink() {
      clearInterval(blinker);
      var on = true;
      cursor.style.visibility = "";
      blinker = setInterval(function() {
        cursor.style.visibility = (on = !on) ? "" : "hidden";
      }, 650);
    }

    var matching = {"(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<"};
    function matchBrackets(autoclear) {
      var head = sel.inverted ? sel.from : sel.to, line = getLine(head.line), pos = head.ch - 1;
      var match = (pos >= 0 && matching[line.text.charAt(pos)]) || matching[line.text.charAt(++pos)];
      if (!match) return;
      var ch = match.charAt(0), forward = match.charAt(1) == ">", d = forward ? 1 : -1, st = line.styles;
      for (var off = pos + 1, i = 0, e = st.length; i < e; i+=2)
        if ((off -= st[i].length) <= 0) {var style = st[i+1]; break;}

      var stack = [line.text.charAt(pos)], re = /[(){}[\]]/;
      function scan(line, from, to) {
        if (!line.text) return;
        var st = line.styles, pos = forward ? 0 : line.text.length - 1, cur;
        for (var i = forward ? 0 : st.length - 2, e = forward ? st.length : -2; i != e; i += 2*d) {
          var text = st[i];
          if (st[i+1] != null && st[i+1] != style) {pos += d * text.length; continue;}
          for (var j = forward ? 0 : text.length - 1, te = forward ? text.length : -1; j != te; j += d, pos+=d) {
            if (pos >= from && pos < to && re.test(cur = text.charAt(j))) {
              var match = matching[cur];
              if (match.charAt(1) == ">" == forward) stack.push(cur);
              else if (stack.pop() != match.charAt(0)) return {pos: pos, match: false};
              else if (!stack.length) return {pos: pos, match: true};
            }
          }
        }
      }
      for (var i = head.line, e = forward ? Math.min(i + 100, doc.size) : Math.max(-1, i - 100); i != e; i+=d) {
        var line = getLine(i), first = i == head.line;
        var found = scan(line, first && forward ? pos + 1 : 0, first && !forward ? pos : line.text.length);
        if (found) break;
      }
      if (!found) found = {pos: null, match: false};
      var style = found.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
      var one = markText({line: head.line, ch: pos}, {line: head.line, ch: pos+1}, style),
          two = found.pos != null && markText({line: i, ch: found.pos}, {line: i, ch: found.pos + 1}, style);
      var clear = operation(function(){one.clear(); two && two.clear();});
      if (autoclear) setTimeout(clear, 800);
      else bracketHighlighted = clear;
    }

    // Finds the line to start with when starting a parse. Tries to
    // find a line with a stateAfter, so that it can start with a
    // valid state. If that fails, it returns the line with the
    // smallest indentation, which tends to need the least context to
    // parse correctly.
    function findStartLine(n) {
      var minindent, minline;
      for (var search = n, lim = n - 40; search > lim; --search) {
        if (search == 0) return 0;
        var line = getLine(search-1);
        if (line.stateAfter) return search;
        var indented = line.indentation(options.tabSize);
        if (minline == null || minindent > indented) {
          minline = search - 1;
          minindent = indented;
        }
      }
      return minline;
    }
    function getStateBefore(n) {
      var start = findStartLine(n), state = start && getLine(start-1).stateAfter;
      if (!state) state = startState(mode);
      else state = copyState(mode, state);
      doc.iter(start, n, function(line) {
        line.highlight(mode, state, options.tabSize);
        line.stateAfter = copyState(mode, state);
      });
      if (start < n) changes.push({from: start, to: n});
      if (n < doc.size && !getLine(n).stateAfter) work.push(n);
      return state;
    }
    function highlightLines(start, end) {
      var state = getStateBefore(start);
      doc.iter(start, end, function(line) {
        line.highlight(mode, state, options.tabSize);
        line.stateAfter = copyState(mode, state);
      });
    }
    function highlightWorker() {
      var end = +new Date + options.workTime;
      var foundWork = work.length;
      while (work.length) {
        if (!getLine(showingFrom).stateAfter) var task = showingFrom;
        else var task = work.pop();
        if (task >= doc.size) continue;
        var start = findStartLine(task), state = start && getLine(start-1).stateAfter;
        if (state) state = copyState(mode, state);
        else state = startState(mode);

        var unchanged = 0, compare = mode.compareStates, realChange = false,
            i = start, bail = false;
        doc.iter(i, doc.size, function(line) {
          var hadState = line.stateAfter;
          if (+new Date > end) {
            work.push(i);
            startWorker(options.workDelay);
            if (realChange) changes.push({from: task, to: i + 1});
            return (bail = true);
          }
          var changed = line.highlight(mode, state, options.tabSize);
          if (changed) realChange = true;
          line.stateAfter = copyState(mode, state);
          var done = null;
          if (compare) {
            var same = hadState && compare(hadState, state);
            if (same != Pass) done = !!same;
          }
          if (done == null) {
            if (changed !== false || !hadState) unchanged = 0;
            else if (++unchanged > 3 && (!mode.indent || mode.indent(hadState, "") == mode.indent(state, "")))
              done = true;
          }
          if (done) return true;
          ++i;
        });
        if (bail) return;
        if (realChange) changes.push({from: task, to: i + 1});
      }
      if (foundWork && options.onHighlightComplete)
        options.onHighlightComplete(instance);
    }
    function startWorker(time) {
      if (!work.length) return;
      highlight.set(time, operation(highlightWorker));
    }

    // Operations are used to wrap changes in such a way that each
    // change won't have to update the cursor and display (which would
    // be awkward, slow, and error-prone), but instead updates are
    // batched and then all combined and executed at once.
    function startOperation() {
      updateInput = userSelChange = textChanged = null;
      changes = []; selectionChanged = false; callbacks = [];
    }
    function endOperation() {
      var reScroll = false, updated;
      if (maxLengthChanged) computeMaxLength();
      if (selectionChanged) reScroll = !scrollCursorIntoView();
      if (changes.length) updated = updateDisplay(changes, true);
      else {
        if (selectionChanged) updateSelection();
        if (gutterDirty) updateGutter();
      }
      if (reScroll) scrollCursorIntoView();
      if (selectionChanged) {scrollEditorIntoView(); restartBlink();}

      if (focused && !leaveInputAlone &&
          (updateInput === true || (updateInput !== false && selectionChanged)))
        resetInput(userSelChange);

      if (selectionChanged && options.matchBrackets)
        setTimeout(operation(function() {
          if (bracketHighlighted) {bracketHighlighted(); bracketHighlighted = null;}
          if (posEq(sel.from, sel.to)) matchBrackets(false);
        }), 20);
      var tc = textChanged, cbs = callbacks; // these can be reset by callbacks
      if (selectionChanged && options.onCursorActivity)
        options.onCursorActivity(instance);
      if (tc && options.onChange && instance)
        options.onChange(instance, tc);
      for (var i = 0; i < cbs.length; ++i) cbs[i](instance);
      if (updated && options.onUpdate) options.onUpdate(instance);
    }
    var nestedOperation = 0;
    function operation(f) {
      return function() {
        if (!nestedOperation++) startOperation();
        try {var result = f.apply(this, arguments);}
        finally {if (!--nestedOperation) endOperation();}
        return result;
      };
    }

    function compoundChange(f) {
      history.startCompound();
      try { return f(); } finally { history.endCompound(); }
    }

    for (var ext in extensions)
      if (extensions.propertyIsEnumerable(ext) &&
          !instance.propertyIsEnumerable(ext))
        instance[ext] = extensions[ext];
    return instance;
  } // (end of function CodeMirror)

  // The default configuration options.
  CodeMirror.defaults = {
    value: "",
    mode: null,
    theme: "default",
    indentUnit: 2,
    indentWithTabs: false,
    smartIndent: true,
    tabSize: 4,
    keyMap: "default",
    extraKeys: null,
    electricChars: true,
    autoClearEmptyLines: false,
    onKeyEvent: null,
    onDragEvent: null,
    lineWrapping: false,
    lineNumbers: false,
    gutter: false,
    fixedGutter: false,
    firstLineNumber: 1,
    readOnly: false,
    dragDrop: true,
    onChange: null,
    onCursorActivity: null,
    onGutterClick: null,
    onHighlightComplete: null,
    onUpdate: null,
    onFocus: null, onBlur: null, onScroll: null,
    matchBrackets: false,
    workTime: 100,
    workDelay: 200,
    pollInterval: 100,
    undoDepth: 40,
    tabindex: null,
    autofocus: null
  };

  var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
  var mac = ios || /Mac/.test(navigator.platform);
  var win = /Win/.test(navigator.platform);

  // Known modes, by name and by MIME
  var modes = CodeMirror.modes = {}, mimeModes = CodeMirror.mimeModes = {};
  CodeMirror.defineMode = function(name, mode) {
    if (!CodeMirror.defaults.mode && name != "null") CodeMirror.defaults.mode = name;
    if (arguments.length > 2) {
      mode.dependencies = [];
      for (var i = 2; i < arguments.length; ++i) mode.dependencies.push(arguments[i]);
    }
    modes[name] = mode;
  };
  CodeMirror.defineMIME = function(mime, spec) {
    mimeModes[mime] = spec;
  };
  CodeMirror.resolveMode = function(spec) {
    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec))
      spec = mimeModes[spec];
    else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec))
      return CodeMirror.resolveMode("application/xml");
    if (typeof spec == "string") return {name: spec};
    else return spec || {name: "null"};
  };
  CodeMirror.getMode = function(options, spec) {
    var spec = CodeMirror.resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory) return CodeMirror.getMode(options, "text/plain");
    return mfactory(options, spec);
  };
  CodeMirror.listModes = function() {
    var list = [];
    for (var m in modes)
      if (modes.propertyIsEnumerable(m)) list.push(m);
    return list;
  };
  CodeMirror.listMIMEs = function() {
    var list = [];
    for (var m in mimeModes)
      if (mimeModes.propertyIsEnumerable(m)) list.push({mime: m, mode: mimeModes[m]});
    return list;
  };

  var extensions = CodeMirror.extensions = {};
  CodeMirror.defineExtension = function(name, func) {
    extensions[name] = func;
  };

  var commands = CodeMirror.commands = {
    selectAll: function(cm) {cm.setSelection({line: 0, ch: 0}, {line: cm.lineCount() - 1});},
    killLine: function(cm) {
      var from = cm.getCursor(true), to = cm.getCursor(false), sel = !posEq(from, to);
      if (!sel && cm.getLine(from.line).length == from.ch) cm.replaceRange("", from, {line: from.line + 1, ch: 0});
      else cm.replaceRange("", from, sel ? to : {line: from.line});
    },
    deleteLine: function(cm) {var l = cm.getCursor().line; cm.replaceRange("", {line: l, ch: 0}, {line: l});},
    undo: function(cm) {cm.undo();},
    redo: function(cm) {cm.redo();},
    goDocStart: function(cm) {cm.setCursor(0, 0, true);},
    goDocEnd: function(cm) {cm.setSelection({line: cm.lineCount() - 1}, null, true);},
    goLineStart: function(cm) {cm.setCursor(cm.getCursor().line, 0, true);},
    goLineStartSmart: function(cm) {
      var cur = cm.getCursor();
      var text = cm.getLine(cur.line), firstNonWS = Math.max(0, text.search(/\S/));
      cm.setCursor(cur.line, cur.ch <= firstNonWS && cur.ch ? 0 : firstNonWS, true);
    },
    goLineEnd: function(cm) {cm.setSelection({line: cm.getCursor().line}, null, true);},
    goLineUp: function(cm) {cm.moveV(-1, "line");},
    goLineDown: function(cm) {cm.moveV(1, "line");},
    goPageUp: function(cm) {cm.moveV(-1, "page");},
    goPageDown: function(cm) {cm.moveV(1, "page");},
    goCharLeft: function(cm) {cm.moveH(-1, "char");},
    goCharRight: function(cm) {cm.moveH(1, "char");},
    goColumnLeft: function(cm) {cm.moveH(-1, "column");},
    goColumnRight: function(cm) {cm.moveH(1, "column");},
    goWordLeft: function(cm) {cm.moveH(-1, "word");},
    goWordRight: function(cm) {cm.moveH(1, "word");},
    delCharLeft: function(cm) {cm.deleteH(-1, "char");},
    delCharRight: function(cm) {cm.deleteH(1, "char");},
    delWordLeft: function(cm) {cm.deleteH(-1, "word");},
    delWordRight: function(cm) {cm.deleteH(1, "word");},
    indentAuto: function(cm) {cm.indentSelection("smart");},
    indentMore: function(cm) {cm.indentSelection("add");},
    indentLess: function(cm) {cm.indentSelection("subtract");},
    insertTab: function(cm) {cm.replaceSelection("\t", "end");},
    defaultTab: function(cm) {
      if (cm.somethingSelected()) cm.indentSelection("add");
      else cm.replaceSelection("\t", "end");
    },
    transposeChars: function(cm) {
      var cur = cm.getCursor(), line = cm.getLine(cur.line);
      if (cur.ch > 0 && cur.ch < line.length - 1)
        cm.replaceRange(line.charAt(cur.ch) + line.charAt(cur.ch - 1),
                        {line: cur.line, ch: cur.ch - 1}, {line: cur.line, ch: cur.ch + 1});
    },
    newlineAndIndent: function(cm) {
      cm.replaceSelection("\n", "end");
      cm.indentLine(cm.getCursor().line);
    },
    toggleOverwrite: function(cm) {cm.toggleOverwrite();}
  };

  var keyMap = CodeMirror.keyMap = {};
  keyMap.basic = {
    "Left": "goCharLeft", "Right": "goCharRight", "Up": "goLineUp", "Down": "goLineDown",
    "End": "goLineEnd", "Home": "goLineStartSmart", "PageUp": "goPageUp", "PageDown": "goPageDown",
    "Delete": "delCharRight", "Backspace": "delCharLeft", "Tab": "defaultTab", "Shift-Tab": "indentAuto",
    "Enter": "newlineAndIndent", "Insert": "toggleOverwrite"
  };
  // Note that the save and find-related commands aren't defined by
  // default. Unknown commands are simply ignored.
  keyMap.pcDefault = {
    "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart", "Alt-Up": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Down": "goDocEnd",
    "Ctrl-Left": "goWordLeft", "Ctrl-Right": "goWordRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delWordLeft", "Ctrl-Delete": "delWordRight", "Ctrl-S": "save", "Ctrl-F": "find",
    "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess", "Ctrl-]": "indentMore",
    fallthrough: "basic"
  };
  keyMap.macDefault = {
    "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo",
    "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goWordLeft",
    "Alt-Right": "goWordRight", "Cmd-Left": "goLineStart", "Cmd-Right": "goLineEnd", "Alt-Backspace": "delWordLeft",
    "Ctrl-Alt-Backspace": "delWordRight", "Alt-Delete": "delWordRight", "Cmd-S": "save", "Cmd-F": "find",
    "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess", "Cmd-]": "indentMore",
    fallthrough: ["basic", "emacsy"]
  };
  keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
  keyMap.emacsy = {
    "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
    "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageUp", "Shift-Ctrl-V": "goPageDown", "Ctrl-D": "delCharRight", "Ctrl-H": "delCharLeft",
    "Alt-D": "delWordRight", "Alt-Backspace": "delWordLeft", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars"
  };

  function getKeyMap(val) {
    if (typeof val == "string") return keyMap[val];
    else return val;
  }
  function lookupKey(name, extraMap, map, handle, stop) {
    function lookup(map) {
      map = getKeyMap(map);
      var found = map[name];
      if (found != null && handle(found)) return true;
      if (map.nofallthrough) {
        if (stop) stop();
        return true;
      }
      var fallthrough = map.fallthrough;
      if (fallthrough == null) return false;
      if (Object.prototype.toString.call(fallthrough) != "[object Array]")
        return lookup(fallthrough);
      for (var i = 0, e = fallthrough.length; i < e; ++i) {
        if (lookup(fallthrough[i])) return true;
      }
      return false;
    }
    if (extraMap && lookup(extraMap)) return true;
    return lookup(map);
  }
  function isModifierKey(event) {
    var name = keyNames[e_prop(event, "keyCode")];
    return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
  }

  CodeMirror.fromTextArea = function(textarea, options) {
    if (!options) options = {};
    options.value = textarea.value;
    if (!options.tabindex && textarea.tabindex)
      options.tabindex = textarea.tabindex;
    if (options.autofocus == null && textarea.getAttribute("autofocus") != null)
      options.autofocus = true;

    function save() {textarea.value = instance.getValue();}
    if (textarea.form) {
      // Deplorable hack to make the submit method do the right thing.
      var rmSubmit = connect(textarea.form, "submit", save, true);
      if (typeof textarea.form.submit == "function") {
        var realSubmit = textarea.form.submit;
        function wrappedSubmit() {
          save();
          textarea.form.submit = realSubmit;
          textarea.form.submit();
          textarea.form.submit = wrappedSubmit;
        }
        textarea.form.submit = wrappedSubmit;
      }
    }

    textarea.style.display = "none";
    var instance = CodeMirror(function(node) {
      textarea.parentNode.insertBefore(node, textarea.nextSibling);
    }, options);
    instance.save = save;
    instance.getTextArea = function() { return textarea; };
    instance.toTextArea = function() {
      save();
      textarea.parentNode.removeChild(instance.getWrapperElement());
      textarea.style.display = "";
      if (textarea.form) {
        rmSubmit();
        if (typeof textarea.form.submit == "function")
          textarea.form.submit = realSubmit;
      }
    };
    return instance;
  };

  // Utility functions for working with state. Exported because modes
  // sometimes need to do this.
  function copyState(mode, state) {
    if (state === true) return state;
    if (mode.copyState) return mode.copyState(state);
    var nstate = {};
    for (var n in state) {
      var val = state[n];
      if (val instanceof Array) val = val.concat([]);
      nstate[n] = val;
    }
    return nstate;
  }
  CodeMirror.copyState = copyState;
  function startState(mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true;
  }
  CodeMirror.startState = startState;

  // The character stream used by a mode's parser.
  function StringStream(string, tabSize) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
  }
  StringStream.prototype = {
    eol: function() {return this.pos >= this.string.length;},
    sol: function() {return this.pos == 0;},
    peek: function() {return this.string.charAt(this.pos);},
    next: function() {
      if (this.pos < this.string.length)
        return this.string.charAt(this.pos++);
    },
    eat: function(match) {
      var ch = this.string.charAt(this.pos);
      if (typeof match == "string") var ok = ch == match;
      else var ok = ch && (match.test ? match.test(ch) : match(ch));
      if (ok) {++this.pos; return ch;}
    },
    eatWhile: function(match) {
      var start = this.pos;
      while (this.eat(match)){}
      return this.pos > start;
    },
    eatSpace: function() {
      var start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
      return this.pos > start;
    },
    skipToEnd: function() {this.pos = this.string.length;},
    skipTo: function(ch) {
      var found = this.string.indexOf(ch, this.pos);
      if (found > -1) {this.pos = found; return true;}
    },
    backUp: function(n) {this.pos -= n;},
    column: function() {return countColumn(this.string, this.start, this.tabSize);},
    indentation: function() {return countColumn(this.string, null, this.tabSize);},
    match: function(pattern, consume, caseInsensitive) {
      if (typeof pattern == "string") {
        function cased(str) {return caseInsensitive ? str.toLowerCase() : str;}
        if (cased(this.string).indexOf(cased(pattern), this.pos) == this.pos) {
          if (consume !== false) this.pos += pattern.length;
          return true;
        }
      }
      else {
        var match = this.string.slice(this.pos).match(pattern);
        if (match && consume !== false) this.pos += match[0].length;
        return match;
      }
    },
    current: function(){return this.string.slice(this.start, this.pos);}
  };
  CodeMirror.StringStream = StringStream;

  function MarkedText(from, to, className, marker) {
    this.from = from; this.to = to; this.style = className; this.marker = marker;
  }
  MarkedText.prototype = {
    attach: function(line) { this.marker.set.push(line); },
    detach: function(line) {
      var ix = indexOf(this.marker.set, line);
      if (ix > -1) this.marker.set.splice(ix, 1);
    },
    split: function(pos, lenBefore) {
      if (this.to <= pos && this.to != null) return null;
      var from = this.from < pos || this.from == null ? null : this.from - pos + lenBefore;
      var to = this.to == null ? null : this.to - pos + lenBefore;
      return new MarkedText(from, to, this.style, this.marker);
    },
    dup: function() { return new MarkedText(null, null, this.style, this.marker); },
    clipTo: function(fromOpen, from, toOpen, to, diff) {
      if (fromOpen && to > this.from && (to < this.to || this.to == null))
        this.from = null;
      else if (this.from != null && this.from >= from)
        this.from = Math.max(to, this.from) + diff;
      if (toOpen && (from < this.to || this.to == null) && (from > this.from || this.from == null))
        this.to = null;
      else if (this.to != null && this.to > from)
        this.to = to < this.to ? this.to + diff : from;
    },
    isDead: function() { return this.from != null && this.to != null && this.from >= this.to; },
    sameSet: function(x) { return this.marker == x.marker; }
  };

  function Bookmark(pos) {
    this.from = pos; this.to = pos; this.line = null;
  }
  Bookmark.prototype = {
    attach: function(line) { this.line = line; },
    detach: function(line) { if (this.line == line) this.line = null; },
    split: function(pos, lenBefore) {
      if (pos < this.from) {
        this.from = this.to = (this.from - pos) + lenBefore;
        return this;
      }
    },
    isDead: function() { return this.from > this.to; },
    clipTo: function(fromOpen, from, toOpen, to, diff) {
      if ((fromOpen || from < this.from) && (toOpen || to > this.to)) {
        this.from = 0; this.to = -1;
      } else if (this.from > from) {
        this.from = this.to = Math.max(to, this.from) + diff;
      }
    },
    sameSet: function(x) { return false; },
    find: function() {
      if (!this.line || !this.line.parent) return null;
      return {line: lineNo(this.line), ch: this.from};
    },
    clear: function() {
      if (this.line) {
        var found = indexOf(this.line.marked, this);
        if (found != -1) this.line.marked.splice(found, 1);
        this.line = null;
      }
    }
  };

  // Line objects. These hold state related to a line, including
  // highlighting info (the styles array).
  function Line(text, styles) {
    this.styles = styles || [text, null];
    this.text = text;
    this.height = 1;
    this.marked = this.gutterMarker = this.className = this.bgClassName = this.handlers = null;
    this.stateAfter = this.parent = this.hidden = null;
  }
  Line.inheritMarks = function(text, orig) {
    var ln = new Line(text), mk = orig && orig.marked;
    if (mk) {
      for (var i = 0; i < mk.length; ++i) {
        if (mk[i].to == null && mk[i].style) {
          var newmk = ln.marked || (ln.marked = []), mark = mk[i];
          var nmark = mark.dup(); newmk.push(nmark); nmark.attach(ln);
        }
      }
    }
    return ln;
  }
  Line.prototype = {
    // Replace a piece of a line, keeping the styles around it intact.
    replace: function(from, to_, text) {
      var st = [], mk = this.marked, to = to_ == null ? this.text.length : to_;
      copyStyles(0, from, this.styles, st);
      if (text) st.push(text, null);
      copyStyles(to, this.text.length, this.styles, st);
      this.styles = st;
      this.text = this.text.slice(0, from) + text + this.text.slice(to);
      this.stateAfter = null;
      if (mk) {
        var diff = text.length - (to - from);
        for (var i = 0; i < mk.length; ++i) {
          var mark = mk[i];
          mark.clipTo(from == null, from || 0, to_ == null, to, diff);
          if (mark.isDead()) {mark.detach(this); mk.splice(i--, 1);}
        }
      }
    },
    // Split a part off a line, keeping styles and markers intact.
    split: function(pos, textBefore) {
      var st = [textBefore, null], mk = this.marked;
      copyStyles(pos, this.text.length, this.styles, st);
      var taken = new Line(textBefore + this.text.slice(pos), st);
      if (mk) {
        for (var i = 0; i < mk.length; ++i) {
          var mark = mk[i];
          var newmark = mark.split(pos, textBefore.length);
          if (newmark) {
            if (!taken.marked) taken.marked = [];
            taken.marked.push(newmark); newmark.attach(taken);
            if (newmark == mark) mk.splice(i--, 1);
          }
        }
      }
      return taken;
    },
    append: function(line) {
      var mylen = this.text.length, mk = line.marked, mymk = this.marked;
      this.text += line.text;
      copyStyles(0, line.text.length, line.styles, this.styles);
      if (mymk) {
        for (var i = 0; i < mymk.length; ++i)
          if (mymk[i].to == null) mymk[i].to = mylen;
      }
      if (mk && mk.length) {
        if (!mymk) this.marked = mymk = [];
        outer: for (var i = 0; i < mk.length; ++i) {
          var mark = mk[i];
          if (!mark.from) {
            for (var j = 0; j < mymk.length; ++j) {
              var mymark = mymk[j];
              if (mymark.to == mylen && mymark.sameSet(mark)) {
                mymark.to = mark.to == null ? null : mark.to + mylen;
                if (mymark.isDead()) {
                  mymark.detach(this);
                  mk.splice(i--, 1);
                }
                continue outer;
              }
            }
          }
          mymk.push(mark);
          mark.attach(this);
          mark.from += mylen;
          if (mark.to != null) mark.to += mylen;
        }
      }
    },
    fixMarkEnds: function(other) {
      var mk = this.marked, omk = other.marked;
      if (!mk) return;
      for (var i = 0; i < mk.length; ++i) {
        var mark = mk[i], close = mark.to == null;
        if (close && omk) {
          for (var j = 0; j < omk.length; ++j)
            if (omk[j].sameSet(mark)) {close = false; break;}
        }
        if (close) mark.to = this.text.length;
      }
    },
    fixMarkStarts: function() {
      var mk = this.marked;
      if (!mk) return;
      for (var i = 0; i < mk.length; ++i)
        if (mk[i].from == null) mk[i].from = 0;
    },
    addMark: function(mark) {
      mark.attach(this);
      if (this.marked == null) this.marked = [];
      this.marked.push(mark);
      this.marked.sort(function(a, b){return (a.from || 0) - (b.from || 0);});
    },
    // Run the given mode's parser over a line, update the styles
    // array, which contains alternating fragments of text and CSS
    // classes.
    highlight: function(mode, state, tabSize) {
      var stream = new StringStream(this.text, tabSize), st = this.styles, pos = 0;
      var changed = false, curWord = st[0], prevWord;
      if (this.text == "" && mode.blankLine) mode.blankLine(state);
      while (!stream.eol()) {
        var style = mode.token(stream, state);
        var substr = this.text.slice(stream.start, stream.pos);
        stream.start = stream.pos;
        if (pos && st[pos-1] == style)
          st[pos-2] += substr;
        else if (substr) {
          if (!changed && (st[pos+1] != style || (pos && st[pos-2] != prevWord))) changed = true;
          st[pos++] = substr; st[pos++] = style;
          prevWord = curWord; curWord = st[pos];
        }
        // Give up when line is ridiculously long
        if (stream.pos > 5000) {
          st[pos++] = this.text.slice(stream.pos); st[pos++] = null;
          break;
        }
      }
      if (st.length != pos) {st.length = pos; changed = true;}
      if (pos && st[pos-2] != prevWord) changed = true;
      // Short lines with simple highlights return null, and are
      // counted as changed by the driver because they are likely to
      // highlight the same way in various contexts.
      return changed || (st.length < 5 && this.text.length < 10 ? null : false);
    },
    // Fetch the parser token for a given character. Useful for hacks
    // that want to inspect the mode state (say, for completion).
    getTokenAt: function(mode, state, ch) {
      var txt = this.text, stream = new StringStream(txt);
      while (stream.pos < ch && !stream.eol()) {
        stream.start = stream.pos;
        var style = mode.token(stream, state);
      }
      return {start: stream.start,
              end: stream.pos,
              string: stream.current(),
              className: style || null,
              state: state};
    },
    indentation: function(tabSize) {return countColumn(this.text, null, tabSize);},
    // Produces an HTML fragment for the line, taking selection,
    // marking, and highlighting into account.
    getHTML: function(makeTab, wrapAt, wrapId, wrapWBR) {
      var html = [], first = true, col = 0;
      function span_(text, style) {
        if (!text) return;
        // Work around a bug where, in some compat modes, IE ignores leading spaces
        if (first && ie && text.charAt(0) == " ") text = "\u00a0" + text.slice(1);
        first = false;
        if (text.indexOf("\t") == -1) {
          col += text.length;
          var escaped = htmlEscape(text);
        } else {
          var escaped = "";
          for (var pos = 0;;) {
            var idx = text.indexOf("\t", pos);
            if (idx == -1) {
              escaped += htmlEscape(text.slice(pos));
              col += text.length - pos;
              break;
            } else {
              col += idx - pos;
              var tab = makeTab(col);
              escaped += htmlEscape(text.slice(pos, idx)) + tab.html;
              col += tab.width;
              pos = idx + 1;
            }
          }
        }
        if (style) html.push('<span class="', style, '">', escaped, "</span>");
        else html.push(escaped);
      }
      var span = span_;
      if (wrapAt != null) {
        var outPos = 0, open = "<span id=\"" + wrapId + "\">";
        span = function(text, style) {
          var l = text.length;
          if (wrapAt >= outPos && wrapAt < outPos + l) {
            if (wrapAt > outPos) {
              span_(text.slice(0, wrapAt - outPos), style);
              // See comment at the definition of spanAffectsWrapping
              if (wrapWBR) html.push("<wbr>");
            }
            html.push(open);
            var cut = wrapAt - outPos;
            span_(window.opera ? text.slice(cut, cut + 1) : text.slice(cut), style);
            html.push("</span>");
            if (window.opera) span_(text.slice(cut + 1), style);
            wrapAt--;
            outPos += l;
          } else {
            outPos += l;
            span_(text, style);
            // Output empty wrapper when at end of line
            if (outPos == wrapAt && outPos == len) html.push(open + " </span>");
            // Stop outputting HTML when gone sufficiently far beyond measure
            else if (outPos > wrapAt + 10 && /\s/.test(text)) span = function(){};
          }
        }
      }

      var st = this.styles, allText = this.text, marked = this.marked;
      var len = allText.length;
      function styleToClass(style) {
        if (!style) return null;
        return "cm-" + style.replace(/ +/g, " cm-");
      }

      if (!allText && wrapAt == null) {
        span(" ");
      } else if (!marked || !marked.length) {
        for (var i = 0, ch = 0; ch < len; i+=2) {
          var str = st[i], style = st[i+1], l = str.length;
          if (ch + l > len) str = str.slice(0, len - ch);
          ch += l;
          span(str, styleToClass(style));
        }
      } else {
        var pos = 0, i = 0, text = "", style, sg = 0;
        var nextChange = marked[0].from || 0, marks = [], markpos = 0;
        function advanceMarks() {
          var m;
          while (markpos < marked.length &&
                 ((m = marked[markpos]).from == pos || m.from == null)) {
            if (m.style != null) marks.push(m);
            ++markpos;
          }
          nextChange = markpos < marked.length ? marked[markpos].from : Infinity;
          for (var i = 0; i < marks.length; ++i) {
            var to = marks[i].to || Infinity;
            if (to == pos) marks.splice(i--, 1);
            else nextChange = Math.min(to, nextChange);
          }
        }
        var m = 0;
        while (pos < len) {
          if (nextChange == pos) advanceMarks();
          var upto = Math.min(len, nextChange);
          while (true) {
            if (text) {
              var end = pos + text.length;
              var appliedStyle = style;
              for (var j = 0; j < marks.length; ++j)
                appliedStyle = (appliedStyle ? appliedStyle + " " : "") + marks[j].style;
              span(end > upto ? text.slice(0, upto - pos) : text, appliedStyle);
              if (end >= upto) {text = text.slice(upto - pos); pos = upto; break;}
              pos = end;
            }
            text = st[i++]; style = styleToClass(st[i++]);
          }
        }
      }
      return html.join("");
    },
    cleanUp: function() {
      this.parent = null;
      if (this.marked)
        for (var i = 0, e = this.marked.length; i < e; ++i) this.marked[i].detach(this);
    }
  };
  // Utility used by replace and split above
  function copyStyles(from, to, source, dest) {
    for (var i = 0, pos = 0, state = 0; pos < to; i+=2) {
      var part = source[i], end = pos + part.length;
      if (state == 0) {
        if (end > from) dest.push(part.slice(from - pos, Math.min(part.length, to - pos)), source[i+1]);
        if (end >= from) state = 1;
      }
      else if (state == 1) {
        if (end > to) dest.push(part.slice(0, to - pos), source[i+1]);
        else dest.push(part, source[i+1]);
      }
      pos = end;
    }
  }

  // Data structure that holds the sequence of lines.
  function LeafChunk(lines) {
    this.lines = lines;
    this.parent = null;
    for (var i = 0, e = lines.length, height = 0; i < e; ++i) {
      lines[i].parent = this;
      height += lines[i].height;
    }
    this.height = height;
  }
  LeafChunk.prototype = {
    chunkSize: function() { return this.lines.length; },
    remove: function(at, n, callbacks) {
      for (var i = at, e = at + n; i < e; ++i) {
        var line = this.lines[i];
        this.height -= line.height;
        line.cleanUp();
        if (line.handlers)
          for (var j = 0; j < line.handlers.length; ++j) callbacks.push(line.handlers[j]);
      }
      this.lines.splice(at, n);
    },
    collapse: function(lines) {
      lines.splice.apply(lines, [lines.length, 0].concat(this.lines));
    },
    insertHeight: function(at, lines, height) {
      this.height += height;
      this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
      for (var i = 0, e = lines.length; i < e; ++i) lines[i].parent = this;
    },
    iterN: function(at, n, op) {
      for (var e = at + n; at < e; ++at)
        if (op(this.lines[at])) return true;
    }
  };
  function BranchChunk(children) {
    this.children = children;
    var size = 0, height = 0;
    for (var i = 0, e = children.length; i < e; ++i) {
      var ch = children[i];
      size += ch.chunkSize(); height += ch.height;
      ch.parent = this;
    }
    this.size = size;
    this.height = height;
    this.parent = null;
  }
  BranchChunk.prototype = {
    chunkSize: function() { return this.size; },
    remove: function(at, n, callbacks) {
      this.size -= n;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at < sz) {
          var rm = Math.min(n, sz - at), oldHeight = child.height;
          child.remove(at, rm, callbacks);
          this.height -= oldHeight - child.height;
          if (sz == rm) { this.children.splice(i--, 1); child.parent = null; }
          if ((n -= rm) == 0) break;
          at = 0;
        } else at -= sz;
      }
      if (this.size - n < 25) {
        var lines = [];
        this.collapse(lines);
        this.children = [new LeafChunk(lines)];
        this.children[0].parent = this;
      }
    },
    collapse: function(lines) {
      for (var i = 0, e = this.children.length; i < e; ++i) this.children[i].collapse(lines);
    },
    insert: function(at, lines) {
      var height = 0;
      for (var i = 0, e = lines.length; i < e; ++i) height += lines[i].height;
      this.insertHeight(at, lines, height);
    },
    insertHeight: function(at, lines, height) {
      this.size += lines.length;
      this.height += height;
      for (var i = 0, e = this.children.length; i < e; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at <= sz) {
          child.insertHeight(at, lines, height);
          if (child.lines && child.lines.length > 50) {
            while (child.lines.length > 50) {
              var spilled = child.lines.splice(child.lines.length - 25, 25);
              var newleaf = new LeafChunk(spilled);
              child.height -= newleaf.height;
              this.children.splice(i + 1, 0, newleaf);
              newleaf.parent = this;
            }
            this.maybeSpill();
          }
          break;
        }
        at -= sz;
      }
    },
    maybeSpill: function() {
      if (this.children.length <= 10) return;
      var me = this;
      do {
        var spilled = me.children.splice(me.children.length - 5, 5);
        var sibling = new BranchChunk(spilled);
        if (!me.parent) { // Become the parent node
          var copy = new BranchChunk(me.children);
          copy.parent = me;
          me.children = [copy, sibling];
          me = copy;
        } else {
          me.size -= sibling.size;
          me.height -= sibling.height;
          var myIndex = indexOf(me.parent.children, me);
          me.parent.children.splice(myIndex + 1, 0, sibling);
        }
        sibling.parent = me.parent;
      } while (me.children.length > 10);
      me.parent.maybeSpill();
    },
    iter: function(from, to, op) { this.iterN(from, to - from, op); },
    iterN: function(at, n, op) {
      for (var i = 0, e = this.children.length; i < e; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at < sz) {
          var used = Math.min(n, sz - at);
          if (child.iterN(at, used, op)) return true;
          if ((n -= used) == 0) break;
          at = 0;
        } else at -= sz;
      }
    }
  };

  function getLineAt(chunk, n) {
    while (!chunk.lines) {
      for (var i = 0;; ++i) {
        var child = chunk.children[i], sz = child.chunkSize();
        if (n < sz) { chunk = child; break; }
        n -= sz;
      }
    }
    return chunk.lines[n];
  }
  function lineNo(line) {
    if (line.parent == null) return null;
    var cur = line.parent, no = indexOf(cur.lines, line);
    for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
      for (var i = 0, e = chunk.children.length; ; ++i) {
        if (chunk.children[i] == cur) break;
        no += chunk.children[i].chunkSize();
      }
    }
    return no;
  }
  function lineAtHeight(chunk, h) {
    var n = 0;
    outer: do {
      for (var i = 0, e = chunk.children.length; i < e; ++i) {
        var child = chunk.children[i], ch = child.height;
        if (h < ch) { chunk = child; continue outer; }
        h -= ch;
        n += child.chunkSize();
      }
      return n;
    } while (!chunk.lines);
    for (var i = 0, e = chunk.lines.length; i < e; ++i) {
      var line = chunk.lines[i], lh = line.height;
      if (h < lh) break;
      h -= lh;
    }
    return n + i;
  }
  function heightAtLine(chunk, n) {
    var h = 0;
    outer: do {
      for (var i = 0, e = chunk.children.length; i < e; ++i) {
        var child = chunk.children[i], sz = child.chunkSize();
        if (n < sz) { chunk = child; continue outer; }
        n -= sz;
        h += child.height;
      }
      return h;
    } while (!chunk.lines);
    for (var i = 0; i < n; ++i) h += chunk.lines[i].height;
    return h;
  }

  // The history object 'chunks' changes that are made close together
  // and at almost the same time into bigger undoable units.
  function History() {
    this.time = 0;
    this.done = []; this.undone = [];
    this.compound = 0;
    this.closed = false;
  }
  History.prototype = {
    addChange: function(start, added, old) {
      this.undone.length = 0;
      var time = +new Date, cur = this.done[this.done.length - 1], last = cur && cur[cur.length - 1];
      var dtime = time - this.time;

      if (this.compound && cur && !this.closed) {
        cur.push({start: start, added: added, old: old});
      } else if (dtime > 400 || !last || this.closed ||
                 last.start > start + old.length || last.start + last.added < start) {
        this.done.push([{start: start, added: added, old: old}]);
        this.closed = false;
      } else {
        var startBefore = Math.max(0, last.start - start),
            endAfter = Math.max(0, (start + old.length) - (last.start + last.added));
        for (var i = startBefore; i > 0; --i) last.old.unshift(old[i - 1]);
        for (var i = endAfter; i > 0; --i) last.old.push(old[old.length - i]);
        if (startBefore) last.start = start;
        last.added += added - (old.length - startBefore - endAfter);
      }
      this.time = time;
    },
    startCompound: function() {
      if (!this.compound++) this.closed = true;
    },
    endCompound: function() {
      if (!--this.compound) this.closed = true;
    }
  };

  function stopMethod() {e_stop(this);}
  // Ensure an event has a stop method.
  function addStop(event) {
    if (!event.stop) event.stop = stopMethod;
    return event;
  }

  function e_preventDefault(e) {
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
  }
  function e_stopPropagation(e) {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }
  function e_stop(e) {e_preventDefault(e); e_stopPropagation(e);}
  CodeMirror.e_stop = e_stop;
  CodeMirror.e_preventDefault = e_preventDefault;
  CodeMirror.e_stopPropagation = e_stopPropagation;

  function e_target(e) {return e.target || e.srcElement;}
  function e_button(e) {
    if (e.which) return e.which;
    else if (e.button & 1) return 1;
    else if (e.button & 2) return 3;
    else if (e.button & 4) return 2;
  }

  // Allow 3rd-party code to override event properties by adding an override
  // object to an event object.
  function e_prop(e, prop) {
    var overridden = e.override && e.override.hasOwnProperty(prop);
    return overridden ? e.override[prop] : e[prop];
  }

  // Event handler registration. If disconnect is true, it'll return a
  // function that unregisters the handler.
  function connect(node, type, handler, disconnect) {
    if (typeof node.addEventListener == "function") {
      node.addEventListener(type, handler, false);
      if (disconnect) return function() {node.removeEventListener(type, handler, false);};
    }
    else {
      var wrapHandler = function(event) {handler(event || window.event);};
      node.attachEvent("on" + type, wrapHandler);
      if (disconnect) return function() {node.detachEvent("on" + type, wrapHandler);};
    }
  }
  CodeMirror.connect = connect;

  function Delayed() {this.id = null;}
  Delayed.prototype = {set: function(ms, f) {clearTimeout(this.id); this.id = setTimeout(f, ms);}};

  var Pass = CodeMirror.Pass = {toString: function(){return "CodeMirror.Pass";}};

  var gecko = /gecko\/\d{7}/i.test(navigator.userAgent);
  var ie = /MSIE \d/.test(navigator.userAgent);
  var ie_lt9 = /MSIE [1-8]\b/.test(navigator.userAgent);
  var quirksMode = ie && document.documentMode == 5;
  var webkit = /WebKit\//.test(navigator.userAgent);
  var chrome = /Chrome\//.test(navigator.userAgent);
  var safari = /Apple Computer/.test(navigator.vendor);
  var khtml = /KHTML\//.test(navigator.userAgent);

  // Detect drag-and-drop
  var dragAndDrop = function() {
    // There is *some* kind of drag-and-drop support in IE6-8, but I
    // couldn't get it to work yet.
    if (ie_lt9) return false;
    var div = document.createElement('div');
    return "draggable" in div || "dragDrop" in div;
  }();

  // Feature-detect whether newlines in textareas are converted to \r\n
  var lineSep = function () {
    var te = document.createElement("textarea");
    te.value = "foo\nbar";
    if (te.value.indexOf("\r") > -1) return "\r\n";
    return "\n";
  }();

  // For a reason I have yet to figure out, some browsers disallow
  // word wrapping between certain characters *only* if a new inline
  // element is started between them. This makes it hard to reliably
  // measure the position of things, since that requires inserting an
  // extra span. This terribly fragile set of regexps matches the
  // character combinations that suffer from this phenomenon on the
  // various browsers.
  var spanAffectsWrapping = /^$/; // Won't match any two-character string
  if (gecko) spanAffectsWrapping = /$'/;
  else if (safari) spanAffectsWrapping = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/;
  else if (chrome) spanAffectsWrapping = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/;

  // Counts the column offset in a string, taking tabs into account.
  // Used mostly to find indentation.
  function countColumn(string, end, tabSize) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1) end = string.length;
    }
    for (var i = 0, n = 0; i < end; ++i) {
      if (string.charAt(i) == "\t") n += tabSize - (n % tabSize);
      else ++n;
    }
    return n;
  }

  function computedStyle(elt) {
    if (elt.currentStyle) return elt.currentStyle;
    return window.getComputedStyle(elt, null);
  }

  // Find the position of an element by following the offsetParent chain.
  // If screen==true, it returns screen (rather than page) coordinates.
  function eltOffset(node, screen) {
    var bod = node.ownerDocument.body;
    var x = 0, y = 0, skipBody = false;
    for (var n = node; n; n = n.offsetParent) {
      var ol = n.offsetLeft, ot = n.offsetTop;
      // Firefox reports weird inverted offsets when the body has a border.
      if (n == bod) { x += Math.abs(ol); y += Math.abs(ot); }
      else { x += ol, y += ot; }
      if (screen && computedStyle(n).position == "fixed")
        skipBody = true;
    }
    var e = screen && !skipBody ? null : bod;
    for (var n = node.parentNode; n != e; n = n.parentNode)
      if (n.scrollLeft != null) { x -= n.scrollLeft; y -= n.scrollTop;}
    return {left: x, top: y};
  }
  // Use the faster and saner getBoundingClientRect method when possible.
  if (document.documentElement.getBoundingClientRect != null) eltOffset = function(node, screen) {
    // Take the parts of bounding client rect that we are interested in so we are able to edit if need be,
    // since the returned value cannot be changed externally (they are kept in sync as the element moves within the page)
    try { var box = node.getBoundingClientRect(); box = { top: box.top, left: box.left }; }
    catch(e) { box = {top: 0, left: 0}; }
    if (!screen) {
      // Get the toplevel scroll, working around browser differences.
      if (window.pageYOffset == null) {
        var t = document.documentElement || document.body.parentNode;
        if (t.scrollTop == null) t = document.body;
        box.top += t.scrollTop; box.left += t.scrollLeft;
      } else {
        box.top += window.pageYOffset; box.left += window.pageXOffset;
      }
    }
    return box;
  };

  // Get a node's text content.
  function eltText(node) {
    return node.textContent || node.innerText || node.nodeValue || "";
  }
  function selectInput(node) {
    if (ios) { // Mobile Safari apparently has a bug where select() is broken.
      node.selectionStart = 0;
      node.selectionEnd = node.value.length;
    } else node.select();
  }

  // Operations on {line, ch} objects.
  function posEq(a, b) {return a.line == b.line && a.ch == b.ch;}
  function posLess(a, b) {return a.line < b.line || (a.line == b.line && a.ch < b.ch);}
  function copyPos(x) {return {line: x.line, ch: x.ch};}

  var escapeElement = document.createElement("pre");
  function htmlEscape(str) {
    escapeElement.textContent = str;
    return escapeElement.innerHTML;
  }
  // Recent (late 2011) Opera betas insert bogus newlines at the start
  // of the textContent, so we strip those.
  if (htmlEscape("a") == "\na")
    htmlEscape = function(str) {
      escapeElement.textContent = str;
      return escapeElement.innerHTML.slice(1);
    };
  // Some IEs don't preserve tabs through innerHTML
  else if (htmlEscape("\t") != "\t")
    htmlEscape = function(str) {
      escapeElement.innerHTML = "";
      escapeElement.appendChild(document.createTextNode(str));
      return escapeElement.innerHTML;
    };
  CodeMirror.htmlEscape = htmlEscape;

  // Used to position the cursor after an undo/redo by finding the
  // last edited character.
  function editEnd(from, to) {
    if (!to) return 0;
    if (!from) return to.length;
    for (var i = from.length, j = to.length; i >= 0 && j >= 0; --i, --j)
      if (from.charAt(i) != to.charAt(j)) break;
    return j + 1;
  }

  function indexOf(collection, elt) {
    if (collection.indexOf) return collection.indexOf(elt);
    for (var i = 0, e = collection.length; i < e; ++i)
      if (collection[i] == elt) return i;
    return -1;
  }
  function isWordChar(ch) {
    return /\w/.test(ch) || ch.toUpperCase() != ch.toLowerCase();
  }

  // See if "".split is the broken IE version, if so, provide an
  // alternative way to split lines.
  var splitLines = "\n\nb".split(/\n/).length != 3 ? function(string) {
    var pos = 0, nl, result = [];
    while ((nl = string.indexOf("\n", pos)) > -1) {
      result.push(string.slice(pos, string.charAt(nl-1) == "\r" ? nl - 1 : nl));
      pos = nl + 1;
    }
    result.push(string.slice(pos));
    return result;
  } : function(string){return string.split(/\r?\n/);};
  CodeMirror.splitLines = splitLines;

  var hasSelection = window.getSelection ? function(te) {
    try { return te.selectionStart != te.selectionEnd; }
    catch(e) { return false; }
  } : function(te) {
    try {var range = te.ownerDocument.selection.createRange();}
    catch(e) {}
    if (!range || range.parentElement() != te) return false;
    return range.compareEndPoints("StartToEnd", range) != 0;
  };

  CodeMirror.defineMode("null", function() {
    return {token: function(stream) {stream.skipToEnd();}};
  });
  CodeMirror.defineMIME("text/plain", "null");

  var keyNames = {3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
                  19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
                  36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
                  46: "Delete", 59: ";", 91: "Mod", 92: "Mod", 93: "Mod", 127: "Delete", 186: ";", 187: "=", 188: ",",
                  189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'", 63276: "PageUp",
                  63277: "PageDown", 63275: "End", 63273: "Home", 63234: "Left", 63232: "Up", 63235: "Right",
                  63233: "Down", 63302: "Insert", 63272: "Delete"};
  CodeMirror.keyNames = keyNames;
  (function() {
    // Number keys
    for (var i = 0; i < 10; i++) keyNames[i + 48] = String(i);
    // Alphabetic keys
    for (var i = 65; i <= 90; i++) keyNames[i] = String.fromCharCode(i);
    // Function keys
    for (var i = 1; i <= 12; i++) keyNames[i + 111] = keyNames[i + 63235] = "F" + i;
  })();

  return CodeMirror;
})();
/**
 * Link to the project's GitHub page:
 * https://github.com/pickhardt/coffeescript-codemirror-mode
 */

CodeMirror.defineMode('coffeescript', function(conf) {
    var ERRORCLASS = 'error';

    function wordRegexp(words) {
        return new RegExp("^((" + words.join(")|(") + "))\\b");
    }

    var singleOperators = new RegExp("^[\\+\\-\\*/%&|\\^~<>!\?]");
    var singleDelimiters = new RegExp('^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]');
    var doubleOperators = new RegExp("^((\->)|(\=>)|(\\+\\+)|(\\+\\=)|(\\-\\-)|(\\-\\=)|(\\*\\*)|(\\*\\=)|(\\/\\/)|(\\/\\=)|(==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//))");
    var doubleDelimiters = new RegExp("^((\\.\\.)|(\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))");
    var tripleDelimiters = new RegExp("^((\\.\\.\\.)|(//=)|(>>=)|(<<=)|(\\*\\*=))");
    var identifiers = new RegExp("^[_A-Za-z$][_A-Za-z$0-9]*");

    var wordOperators = wordRegexp(['and', 'or', 'not',
                                    'is', 'isnt', 'in',
                                    'instanceof', 'typeof']);
    var indentKeywords = ['for', 'while', 'loop', 'if', 'unless', 'else',
                          'switch', 'try', 'catch', 'finally', 'class'];
    var commonKeywords = ['break', 'by', 'continue', 'debugger', 'delete',
                          'do', 'in', 'of', 'new', 'return', 'then',
                          'this', 'throw', 'when', 'until'];

    var keywords = wordRegexp(indentKeywords.concat(commonKeywords));

    indentKeywords = wordRegexp(indentKeywords);


    var stringPrefixes = new RegExp("^('{3}|\"{3}|['\"])");
    var regexPrefixes = new RegExp("^(/{3}|/)");
    var commonConstants = ['Infinity', 'NaN', 'undefined', 'null', 'true', 'false', 'on', 'off', 'yes', 'no'];
    var constants = wordRegexp(commonConstants);

    // Tokenizers
    function tokenBase(stream, state) {
        // Handle scope changes
        if (stream.sol()) {
            var scopeOffset = state.scopes[0].offset;
            if (stream.eatSpace()) {
                var lineOffset = stream.indentation();
                if (lineOffset > scopeOffset) {
                    return 'indent';
                } else if (lineOffset < scopeOffset) {
                    return 'dedent';
                }
                return null;
            } else {
                if (scopeOffset > 0) {
                    dedent(stream, state);
                }
            }
        }
        if (stream.eatSpace()) {
            return null;
        }

        var ch = stream.peek();

        // Handle docco title comment (single line)
        if (stream.match("####")) {
            stream.skipToEnd();
            return 'comment';
        }

        // Handle multi line comments
        if (stream.match("###")) {
            state.tokenize = longComment;
            return state.tokenize(stream, state);
        }

        // Single line comment
        if (ch === '#') {
            stream.skipToEnd();
            return 'comment';
        }

        // Handle number literals
        if (stream.match(/^-?[0-9\.]/, false)) {
            var floatLiteral = false;
            // Floats
            if (stream.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i)) {
              floatLiteral = true;
            }
            if (stream.match(/^-?\d+\.\d*/)) {
              floatLiteral = true;
            }
            if (stream.match(/^-?\.\d+/)) {
              floatLiteral = true;
            }

            if (floatLiteral) {
                // prevent from getting extra . on 1..
                if (stream.peek() == "."){
                    stream.backUp(1);
                }
                return 'number';
            }
            // Integers
            var intLiteral = false;
            // Hex
            if (stream.match(/^-?0x[0-9a-f]+/i)) {
              intLiteral = true;
            }
            // Decimal
            if (stream.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/)) {
                intLiteral = true;
            }
            // Zero by itself with no other piece of number.
            if (stream.match(/^-?0(?![\dx])/i)) {
              intLiteral = true;
            }
            if (intLiteral) {
                return 'number';
            }
        }

        // Handle strings
        if (stream.match(stringPrefixes)) {
            state.tokenize = tokenFactory(stream.current(), 'string');
            return state.tokenize(stream, state);
        }
        // Handle regex literals
        if (stream.match(regexPrefixes)) {
            if (stream.current() != '/' || stream.match(/^.*\//, false)) { // prevent highlight of division
                state.tokenize = tokenFactory(stream.current(), 'string-2');
                return state.tokenize(stream, state);
            } else {
                stream.backUp(1);
            }
        }

        // Handle operators and delimiters
        if (stream.match(tripleDelimiters) || stream.match(doubleDelimiters)) {
            return 'punctuation';
        }
        if (stream.match(doubleOperators)
            || stream.match(singleOperators)
            || stream.match(wordOperators)) {
            return 'operator';
        }
        if (stream.match(singleDelimiters)) {
            return 'punctuation';
        }

        if (stream.match(constants)) {
            return 'atom';
        }

        if (stream.match(keywords)) {
            return 'keyword';
        }

        if (stream.match(identifiers)) {
            return 'variable';
        }

        // Handle non-detected items
        stream.next();
        return ERRORCLASS;
    }

    function tokenFactory(delimiter, outclass) {
        var singleline = delimiter.length == 1;
        return function tokenString(stream, state) {
            while (!stream.eol()) {
                stream.eatWhile(/[^'"\/\\]/);
                if (stream.eat('\\')) {
                    stream.next();
                    if (singleline && stream.eol()) {
                        return outclass;
                    }
                } else if (stream.match(delimiter)) {
                    state.tokenize = tokenBase;
                    return outclass;
                } else {
                    stream.eat(/['"\/]/);
                }
            }
            if (singleline) {
                if (conf.mode.singleLineStringErrors) {
                    outclass = ERRORCLASS
                } else {
                    state.tokenize = tokenBase;
                }
            }
            return outclass;
        };
    }

    function longComment(stream, state) {
        while (!stream.eol()) {
            stream.eatWhile(/[^#]/);
            if (stream.match("###")) {
                state.tokenize = tokenBase;
                break;
            }
            stream.eatWhile("#");
        }
        return "comment"
    }

    function indent(stream, state, type) {
        type = type || 'coffee';
        var indentUnit = 0;
        if (type === 'coffee') {
            for (var i = 0; i < state.scopes.length; i++) {
                if (state.scopes[i].type === 'coffee') {
                    indentUnit = state.scopes[i].offset + conf.indentUnit;
                    break;
                }
            }
        } else {
            indentUnit = stream.column() + stream.current().length;
        }
        state.scopes.unshift({
            offset: indentUnit,
            type: type
        });
    }

    function dedent(stream, state) {
        if (state.scopes.length == 1) return;
        if (state.scopes[0].type === 'coffee') {
            var _indent = stream.indentation();
            var _indent_index = -1;
            for (var i = 0; i < state.scopes.length; ++i) {
                if (_indent === state.scopes[i].offset) {
                    _indent_index = i;
                    break;
                }
            }
            if (_indent_index === -1) {
                return true;
            }
            while (state.scopes[0].offset !== _indent) {
                state.scopes.shift();
            }
            return false
        } else {
            state.scopes.shift();
            return false;
        }
    }

    function tokenLexer(stream, state) {
        var style = state.tokenize(stream, state);
        var current = stream.current();

        // Handle '.' connected identifiers
        if (current === '.') {
            style = state.tokenize(stream, state);
            current = stream.current();
            if (style === 'variable') {
                return 'variable';
            } else {
                return ERRORCLASS;
            }
        }

        // Handle properties
        if (current === '@') {
            stream.eat('@');
            return 'keyword';
        }

        // Handle scope changes.
        if (current === 'return') {
            state.dedent += 1;
        }
        if (((current === '->' || current === '=>') &&
                  !state.lambda &&
                  state.scopes[0].type == 'coffee' &&
                  stream.peek() === '')
               || style === 'indent') {
            indent(stream, state);
        }
        var delimiter_index = '[({'.indexOf(current);
        if (delimiter_index !== -1) {
            indent(stream, state, '])}'.slice(delimiter_index, delimiter_index+1));
        }
        if (indentKeywords.exec(current)){
            indent(stream, state);
        }
        if (current == 'then'){
            dedent(stream, state);
        }


        if (style === 'dedent') {
            if (dedent(stream, state)) {
                return ERRORCLASS;
            }
        }
        delimiter_index = '])}'.indexOf(current);
        if (delimiter_index !== -1) {
            if (dedent(stream, state)) {
                return ERRORCLASS;
            }
        }
        if (state.dedent > 0 && stream.eol() && state.scopes[0].type == 'coffee') {
            if (state.scopes.length > 1) state.scopes.shift();
            state.dedent -= 1;
        }

        return style;
    }

    var external = {
        startState: function(basecolumn) {
            return {
              tokenize: tokenBase,
              scopes: [{offset:basecolumn || 0, type:'coffee'}],
              lastToken: null,
              lambda: false,
              dedent: 0
          };
        },

        token: function(stream, state) {
            var style = tokenLexer(stream, state);

            state.lastToken = {style:style, content: stream.current()};

            if (stream.eol() && stream.lambda) {
                state.lambda = false;
            }

            return style;
        },

        indent: function(state, textAfter) {
            if (state.tokenize != tokenBase) {
                return 0;
            }

            return state.scopes[0].offset;
        }

    };
    return external;
});

CodeMirror.defineMIME('text/x-coffeescript', 'coffeescript');
CodeMirror.defineMode("javascript", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var jsonMode = parserConfig.json;

  // Tokenizer

  var keywords = function(){
    function kw(type) {return {type: type, style: "keyword"};}
    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c");
    var operator = kw("operator"), atom = {type: "atom", style: "atom"};
    return {
      "if": A, "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
      "return": C, "break": C, "continue": C, "new": C, "delete": C, "throw": C,
      "var": kw("var"), "const": kw("var"), "let": kw("var"),
      "function": kw("function"), "catch": kw("catch"),
      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
      "in": operator, "typeof": operator, "instanceof": operator,
      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom
    };
  }();

  var isOperatorChar = /[+\-*&%=<>!?|]/;

  function chain(stream, state, f) {
    state.tokenize = f;
    return f(stream, state);
  }

  function nextUntilUnescaped(stream, end) {
    var escaped = false, next;
    while ((next = stream.next()) != null) {
      if (next == end && !escaped)
        return false;
      escaped = !escaped && next == "\\";
    }
    return escaped;
  }

  // Used as scratch variables to communicate multiple values without
  // consing up tons of objects.
  var type, content;
  function ret(tp, style, cont) {
    type = tp; content = cont;
    return style;
  }

  function jsTokenBase(stream, state) {
    var ch = stream.next();
    if (ch == '"' || ch == "'")
      return chain(stream, state, jsTokenString(ch));
    else if (/[\[\]{}\(\),;\:\.]/.test(ch))
      return ret(ch);
    else if (ch == "0" && stream.eat(/x/i)) {
      stream.eatWhile(/[\da-f]/i);
      return ret("number", "number");
    }
    else if (/\d/.test(ch)) {
      stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
      return ret("number", "number");
    }
    else if (ch == "/") {
      if (stream.eat("*")) {
        return chain(stream, state, jsTokenComment);
      }
      else if (stream.eat("/")) {
        stream.skipToEnd();
        return ret("comment", "comment");
      }
      else if (state.reAllowed) {
        nextUntilUnescaped(stream, "/");
        stream.eatWhile(/[gimy]/); // 'y' is "sticky" option in Mozilla
        return ret("regexp", "string-2");
      }
      else {
        stream.eatWhile(isOperatorChar);
        return ret("operator", null, stream.current());
      }
    }
    else if (ch == "#") {
        stream.skipToEnd();
        return ret("error", "error");
    }
    else if (isOperatorChar.test(ch)) {
      stream.eatWhile(isOperatorChar);
      return ret("operator", null, stream.current());
    }
    else {
      stream.eatWhile(/[\w\$_]/);
      var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
      return (known && state.kwAllowed) ? ret(known.type, known.style, word) :
                     ret("variable", "variable", word);
    }
  }

  function jsTokenString(quote) {
    return function(stream, state) {
      if (!nextUntilUnescaped(stream, quote))
        state.tokenize = jsTokenBase;
      return ret("string", "string");
    };
  }

  function jsTokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = jsTokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ret("comment", "comment");
  }

  // Parser

  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true};

  function JSLexical(indented, column, type, align, prev, info) {
    this.indented = indented;
    this.column = column;
    this.type = type;
    this.prev = prev;
    this.info = info;
    if (align != null) this.align = align;
  }

  function inScope(state, varname) {
    for (var v = state.localVars; v; v = v.next)
      if (v.name == varname) return true;
  }

  function parseJS(state, style, type, content, stream) {
    var cc = state.cc;
    // Communicate our context to the combinators.
    // (Less wasteful than consing up a hundred closures on every call.)
    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc;

    if (!state.lexical.hasOwnProperty("align"))
      state.lexical.align = true;

    while(true) {
      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
      if (combinator(type, content)) {
        while(cc.length && cc[cc.length - 1].lex)
          cc.pop()();
        if (cx.marked) return cx.marked;
        if (type == "variable" && inScope(state, content)) return "variable-2";
        return style;
      }
    }
  }

  // Combinator utils

  var cx = {state: null, column: null, marked: null, cc: null};
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }
  function register(varname) {
    var state = cx.state;
    if (state.context) {
      cx.marked = "def";
      for (var v = state.localVars; v; v = v.next)
        if (v.name == varname) return;
      state.localVars = {name: varname, next: state.localVars};
    }
  }

  // Combinators

  var defaultVars = {name: "this", next: {name: "arguments"}};
  function pushcontext() {
    if (!cx.state.context) cx.state.localVars = defaultVars;
    cx.state.context = {prev: cx.state.context, vars: cx.state.localVars};
  }
  function popcontext() {
    cx.state.localVars = cx.state.context.vars;
    cx.state.context = cx.state.context.prev;
  }
  function pushlex(type, info) {
    var result = function() {
      var state = cx.state;
      state.lexical = new JSLexical(state.indented, cx.stream.column(), type, null, state.lexical, info)
    };
    result.lex = true;
    return result;
  }
  function poplex() {
    var state = cx.state;
    if (state.lexical.prev) {
      if (state.lexical.type == ")")
        state.indented = state.lexical.indented;
      state.lexical = state.lexical.prev;
    }
  }
  poplex.lex = true;

  function expect(wanted) {
    return function expecting(type) {
      if (type == wanted) return cont();
      else if (wanted == ";") return pass();
      else return cont(arguments.callee);
    };
  }

  function statement(type) {
    if (type == "var") return cont(pushlex("vardef"), vardef1, expect(";"), poplex);
    if (type == "keyword a") return cont(pushlex("form"), expression, statement, poplex);
    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
    if (type == "{") return cont(pushlex("}"), block, poplex);
    if (type == ";") return cont();
    if (type == "function") return cont(functiondef);
    if (type == "for") return cont(pushlex("form"), expect("("), pushlex(")"), forspec1, expect(")"),
                                      poplex, statement, poplex);
    if (type == "variable") return cont(pushlex("stat"), maybelabel);
    if (type == "switch") return cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"),
                                         block, poplex, poplex);
    if (type == "case") return cont(expression, expect(":"));
    if (type == "default") return cont(expect(":"));
    if (type == "catch") return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"),
                                        statement, poplex, popcontext);
    return pass(pushlex("stat"), expression, expect(";"), poplex);
  }
  function expression(type) {
    if (atomicTypes.hasOwnProperty(type)) return cont(maybeoperator);
    if (type == "function") return cont(functiondef);
    if (type == "keyword c") return cont(maybeexpression);
    if (type == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeoperator);
    if (type == "operator") return cont(expression);
    if (type == "[") return cont(pushlex("]"), commasep(expression, "]"), poplex, maybeoperator);
    if (type == "{") return cont(pushlex("}"), commasep(objprop, "}"), poplex, maybeoperator);
    return cont();
  }
  function maybeexpression(type) {
    if (type.match(/[;\}\)\],]/)) return pass();
    return pass(expression);
  }

  function maybeoperator(type, value) {
    if (type == "operator" && /\+\+|--/.test(value)) return cont(maybeoperator);
    if (type == "operator" || type == ":") return cont(expression);
    if (type == ";") return;
    if (type == "(") return cont(pushlex(")"), commasep(expression, ")"), poplex, maybeoperator);
    if (type == ".") return cont(property, maybeoperator);
    if (type == "[") return cont(pushlex("]"), expression, expect("]"), poplex, maybeoperator);
  }
  function maybelabel(type) {
    if (type == ":") return cont(poplex, statement);
    return pass(maybeoperator, expect(";"), poplex);
  }
  function property(type) {
    if (type == "variable") {cx.marked = "property"; return cont();}
  }
  function objprop(type) {
    if (type == "variable") cx.marked = "property";
    if (atomicTypes.hasOwnProperty(type)) return cont(expect(":"), expression);
  }
  function commasep(what, end) {
    function proceed(type) {
      if (type == ",") return cont(what, proceed);
      if (type == end) return cont();
      return cont(expect(end));
    }
    return function commaSeparated(type) {
      if (type == end) return cont();
      else return pass(what, proceed);
    };
  }
  function block(type) {
    if (type == "}") return cont();
    return pass(statement, block);
  }
  function vardef1(type, value) {
    if (type == "variable"){register(value); return cont(vardef2);}
    return cont();
  }
  function vardef2(type, value) {
    if (value == "=") return cont(expression, vardef2);
    if (type == ",") return cont(vardef1);
  }
  function forspec1(type) {
    if (type == "var") return cont(vardef1, forspec2);
    if (type == ";") return pass(forspec2);
    if (type == "variable") return cont(formaybein);
    return pass(forspec2);
  }
  function formaybein(type, value) {
    if (value == "in") return cont(expression);
    return cont(maybeoperator, forspec2);
  }
  function forspec2(type, value) {
    if (type == ";") return cont(forspec3);
    if (value == "in") return cont(expression);
    return cont(expression, expect(";"), forspec3);
  }
  function forspec3(type) {
    if (type != ")") cont(expression);
  }
  function functiondef(type, value) {
    if (type == "variable") {register(value); return cont(functiondef);}
    if (type == "(") return cont(pushlex(")"), pushcontext, commasep(funarg, ")"), poplex, statement, popcontext);
  }
  function funarg(type, value) {
    if (type == "variable") {register(value); return cont();}
  }

  // Interface

  return {
    startState: function(basecolumn) {
      return {
        tokenize: jsTokenBase,
        reAllowed: true,
        kwAllowed: true,
        cc: [],
        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
        localVars: parserConfig.localVars,
        context: parserConfig.localVars && {vars: parserConfig.localVars},
        indented: 0
      };
    },

    token: function(stream, state) {
      if (stream.sol()) {
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = false;
        state.indented = stream.indentation();
      }
      if (stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);
      if (type == "comment") return style;
      state.reAllowed = !!(type == "operator" || type == "keyword c" || type.match(/^[\[{}\(,;:]$/));
      state.kwAllowed = type != '.';
      return parseJS(state, style, type, content, stream);
    },

    indent: function(state, textAfter) {
      if (state.tokenize != jsTokenBase) return 0;
      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;
      if (lexical.type == "stat" && firstChar == "}") lexical = lexical.prev;
      var type = lexical.type, closing = firstChar == type;
      if (type == "vardef") return lexical.indented + 4;
      else if (type == "form" && firstChar == "{") return lexical.indented;
      else if (type == "stat" || type == "form") return lexical.indented + indentUnit;
      else if (lexical.info == "switch" && !closing)
        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
      else return lexical.indented + (closing ? 0 : indentUnit);
    },

    electricChars: ":{}"
  };
});

CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
CodeMirror.defineMode("xml", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var Kludges = parserConfig.htmlMode ? {
    autoSelfClosers: {'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
                      'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
                      'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
                      'track': true, 'wbr': true},
    implicitlyClosed: {'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
                       'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
                       'th': true, 'tr': true},
    contextGrabbers: {
      'dd': {'dd': true, 'dt': true},
      'dt': {'dd': true, 'dt': true},
      'li': {'li': true},
      'option': {'option': true, 'optgroup': true},
      'optgroup': {'optgroup': true},
      'p': {'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
            'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
            'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
            'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
            'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true},
      'rp': {'rp': true, 'rt': true},
      'rt': {'rp': true, 'rt': true},
      'tbody': {'tbody': true, 'tfoot': true},
      'td': {'td': true, 'th': true},
      'tfoot': {'tbody': true},
      'th': {'td': true, 'th': true},
      'thead': {'tbody': true, 'tfoot': true},
      'tr': {'tr': true}
    },
    doNotIndent: {"pre": true},
    allowUnquoted: true,
    allowMissing: false
  } : {
    autoSelfClosers: {},
    implicitlyClosed: {},
    contextGrabbers: {},
    doNotIndent: {},
    allowUnquoted: false,
    allowMissing: false
  };
  var alignCDATA = parserConfig.alignCDATA;

  // Return variables for tokenizers
  var tagName, type;

  function inText(stream, state) {
    function chain(parser) {
      state.tokenize = parser;
      return parser(stream, state);
    }

    var ch = stream.next();
    if (ch == "<") {
      if (stream.eat("!")) {
        if (stream.eat("[")) {
          if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));
          else return null;
        }
        else if (stream.match("--")) return chain(inBlock("comment", "-->"));
        else if (stream.match("DOCTYPE", true, true)) {
          stream.eatWhile(/[\w\._\-]/);
          return chain(doctype(1));
        }
        else return null;
      }
      else if (stream.eat("?")) {
        stream.eatWhile(/[\w\._\-]/);
        state.tokenize = inBlock("meta", "?>");
        return "meta";
      }
      else {
        type = stream.eat("/") ? "closeTag" : "openTag";
        stream.eatSpace();
        tagName = "";
        var c;
        while ((c = stream.eat(/[^\s\u00a0=<>\"\'\/?]/))) tagName += c;
        state.tokenize = inTag;
        return "tag";
      }
    }
    else if (ch == "&") {
      var ok;
      if (stream.eat("#")) {
        if (stream.eat("x")) {
          ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
        } else {
          ok = stream.eatWhile(/[\d]/) && stream.eat(";");
        }
      } else {
        ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
      }
      return ok ? "atom" : "error";
    }
    else {
      stream.eatWhile(/[^&<]/);
      return null;
    }
  }

  function inTag(stream, state) {
    var ch = stream.next();
    if (ch == ">" || (ch == "/" && stream.eat(">"))) {
      state.tokenize = inText;
      type = ch == ">" ? "endTag" : "selfcloseTag";
      return "tag";
    }
    else if (ch == "=") {
      type = "equals";
      return null;
    }
    else if (/[\'\"]/.test(ch)) {
      state.tokenize = inAttribute(ch);
      return state.tokenize(stream, state);
    }
    else {
      stream.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
      return "word";
    }
  }

  function inAttribute(quote) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.next() == quote) {
          state.tokenize = inTag;
          break;
        }
      }
      return "string";
    };
  }

  function inBlock(style, terminator) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.match(terminator)) {
          state.tokenize = inText;
          break;
        }
        stream.next();
      }
      return style;
    };
  }
  function doctype(depth) {
    return function(stream, state) {
      var ch;
      while ((ch = stream.next()) != null) {
        if (ch == "<") {
          state.tokenize = doctype(depth + 1);
          return state.tokenize(stream, state);
        } else if (ch == ">") {
          if (depth == 1) {
            state.tokenize = inText;
            break;
          } else {
            state.tokenize = doctype(depth - 1);
            return state.tokenize(stream, state);
          }
        }
      }
      return "meta";
    };
  }

  var curState, setStyle;
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) curState.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }

  function pushContext(tagName, startOfLine) {
    var noIndent = Kludges.doNotIndent.hasOwnProperty(tagName) || (curState.context && curState.context.noIndent);
    curState.context = {
      prev: curState.context,
      tagName: tagName,
      indent: curState.indented,
      startOfLine: startOfLine,
      noIndent: noIndent
    };
  }
  function popContext() {
    if (curState.context) curState.context = curState.context.prev;
  }

  function element(type) {
    if (type == "openTag") {
      curState.tagName = tagName;
      return cont(attributes, endtag(curState.startOfLine));
    } else if (type == "closeTag") {
      var err = false;
      if (curState.context) {
        if (curState.context.tagName != tagName) {
          if (Kludges.implicitlyClosed.hasOwnProperty(curState.context.tagName.toLowerCase())) {
            popContext();
          }
          err = !curState.context || curState.context.tagName != tagName;
        }
      } else {
        err = true;
      }
      if (err) setStyle = "error";
      return cont(endclosetag(err));
    }
    return cont();
  }
  function endtag(startOfLine) {
    return function(type) {
      if (type == "selfcloseTag" ||
          (type == "endTag" && Kludges.autoSelfClosers.hasOwnProperty(curState.tagName.toLowerCase()))) {
        maybePopContext(curState.tagName.toLowerCase());
        return cont();
      }
      if (type == "endTag") {
        maybePopContext(curState.tagName.toLowerCase());
        pushContext(curState.tagName, startOfLine);
        return cont();
      }
      return cont();
    };
  }
  function endclosetag(err) {
    return function(type) {
      if (err) setStyle = "error";
      if (type == "endTag") { popContext(); return cont(); }
      setStyle = "error";
      return cont(arguments.callee);
    }
  }
  function maybePopContext(nextTagName) {
    var parentTagName;
    while (true) {
      if (!curState.context) {
        return;
      }
      parentTagName = curState.context.tagName.toLowerCase();
      if (!Kludges.contextGrabbers.hasOwnProperty(parentTagName) ||
          !Kludges.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
        return;
      }
      popContext();
    }
  }

  function attributes(type) {
    if (type == "word") {setStyle = "attribute"; return cont(attribute, attributes);}
    if (type == "endTag" || type == "selfcloseTag") return pass();
    setStyle = "error";
    return cont(attributes);
  }
  function attribute(type) {
    if (type == "equals") return cont(attvalue, attributes);
    if (!Kludges.allowMissing) setStyle = "error";
    return (type == "endTag" || type == "selfcloseTag") ? pass() : cont();
  }
  function attvalue(type) {
    if (type == "string") return cont(attvaluemaybe);
    if (type == "word" && Kludges.allowUnquoted) {setStyle = "string"; return cont();}
    setStyle = "error";
    return (type == "endTag" || type == "selfCloseTag") ? pass() : cont();
  }
  function attvaluemaybe(type) {
    if (type == "string") return cont(attvaluemaybe);
    else return pass();
  }

  return {
    startState: function() {
      return {tokenize: inText, cc: [], indented: 0, startOfLine: true, tagName: null, context: null};
    },

    token: function(stream, state) {
      if (stream.sol()) {
        state.startOfLine = true;
        state.indented = stream.indentation();
      }
      if (stream.eatSpace()) return null;

      setStyle = type = tagName = null;
      var style = state.tokenize(stream, state);
      state.type = type;
      if ((style || type) && style != "comment") {
        curState = state;
        while (true) {
          var comb = state.cc.pop() || element;
          if (comb(type || style)) break;
        }
      }
      state.startOfLine = false;
      return setStyle || style;
    },

    indent: function(state, textAfter, fullLine) {
      var context = state.context;
      if ((state.tokenize != inTag && state.tokenize != inText) ||
          context && context.noIndent)
        return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
      if (alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
      if (context && /^<\//.test(textAfter))
        context = context.prev;
      while (context && !context.startOfLine)
        context = context.prev;
      if (context) return context.indent + indentUnit;
      else return 0;
    },

    compareStates: function(a, b) {
      if (a.indented != b.indented || a.tokenize != b.tokenize) return false;
      for (var ca = a.context, cb = b.context; ; ca = ca.prev, cb = cb.prev) {
        if (!ca || !cb) return ca == cb;
        if (ca.tagName != cb.tagName) return false;
      }
    },

    electricChars: "/"
  };
});

CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
  CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});
CodeMirror.defineMode("htmlmixed", function(config, parserConfig) {
  var htmlMode = CodeMirror.getMode(config, {name: "xml", htmlMode: true});
  var jsMode = CodeMirror.getMode(config, "javascript");
  var cssMode = CodeMirror.getMode(config, "css");

  function html(stream, state) {
    var style = htmlMode.token(stream, state.htmlState);
    if (style == "tag" && stream.current() == ">" && state.htmlState.context) {
      if (/^script$/i.test(state.htmlState.context.tagName)) {
        state.token = javascript;
        state.localState = jsMode.startState(htmlMode.indent(state.htmlState, ""));
        state.mode = "javascript";
      }
      else if (/^style$/i.test(state.htmlState.context.tagName)) {
        state.token = css;
        state.localState = cssMode.startState(htmlMode.indent(state.htmlState, ""));
        state.mode = "css";
      }
    }
    return style;
  }
  function maybeBackup(stream, pat, style) {
    var cur = stream.current();
    var close = cur.search(pat);
    if (close > -1) stream.backUp(cur.length - close);
    return style;
  }
  function javascript(stream, state) {
    if (stream.match(/^<\/\s*script\s*>/i, false)) {
      state.token = html;
      state.localState = null;
      state.mode = "html";
      return html(stream, state);
    }
    return maybeBackup(stream, /<\/\s*script\s*>/,
                       jsMode.token(stream, state.localState));
  }
  function css(stream, state) {
    if (stream.match(/^<\/\s*style\s*>/i, false)) {
      state.token = html;
      state.localState = null;
      state.mode = "html";
      return html(stream, state);
    }
    return maybeBackup(stream, /<\/\s*style\s*>/,
                       cssMode.token(stream, state.localState));
  }

  return {
    startState: function() {
      var state = htmlMode.startState();
      return {token: html, localState: null, mode: "html", htmlState: state};
    },

    copyState: function(state) {
      if (state.localState)
        var local = CodeMirror.copyState(state.token == css ? cssMode : jsMode, state.localState);
      return {token: state.token, localState: local, mode: state.mode,
              htmlState: CodeMirror.copyState(htmlMode, state.htmlState)};
    },

    token: function(stream, state) {
      return state.token(stream, state);
    },

    indent: function(state, textAfter) {
      if (state.token == html || /^\s*<\//.test(textAfter))
        return htmlMode.indent(state.htmlState, textAfter);
      else if (state.token == javascript)
        return jsMode.indent(state.localState, textAfter);
      else
        return cssMode.indent(state.localState, textAfter);
    },

    compareStates: function(a, b) {
      if (a.mode != b.mode) return false;
      if (a.localState) return CodeMirror.Pass;
      return htmlMode.compareStates(a.htmlState, b.htmlState);
    },

    electricChars: "/{}:"
  }
}, "xml", "javascript", "css");

CodeMirror.defineMIME("text/html", "htmlmixed");
CodeMirror.defineMode("css", function(config) {
  var indentUnit = config.indentUnit, type;
  function ret(style, tp) {type = tp; return style;}

  function tokenBase(stream, state) {
    var ch = stream.next();
    if (ch == "@") {stream.eatWhile(/[\w\\\-]/); return ret("meta", stream.current());}
    else if (ch == "/" && stream.eat("*")) {
      state.tokenize = tokenCComment;
      return tokenCComment(stream, state);
    }
    else if (ch == "<" && stream.eat("!")) {
      state.tokenize = tokenSGMLComment;
      return tokenSGMLComment(stream, state);
    }
    else if (ch == "=") ret(null, "compare");
    else if ((ch == "~" || ch == "|") && stream.eat("=")) return ret(null, "compare");
    else if (ch == "\"" || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    }
    else if (ch == "#") {
      stream.eatWhile(/[\w\\\-]/);
      return ret("atom", "hash");
    }
    else if (ch == "!") {
      stream.match(/^\s*\w*/);
      return ret("keyword", "important");
    }
    else if (/\d/.test(ch)) {
      stream.eatWhile(/[\w.%]/);
      return ret("number", "unit");
    }
    else if (/[,.+>*\/]/.test(ch)) {
      return ret(null, "select-op");
    }
    else if (/[;{}:\[\]]/.test(ch)) {
      return ret(null, ch);
    }
    else {
      stream.eatWhile(/[\w\\\-]/);
      return ret("variable", "variable");
    }
  }

  function tokenCComment(stream, state) {
    var maybeEnd = false, ch;
    while ((ch = stream.next()) != null) {
      if (maybeEnd && ch == "/") {
        state.tokenize = tokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ret("comment", "comment");
  }

  function tokenSGMLComment(stream, state) {
    var dashes = 0, ch;
    while ((ch = stream.next()) != null) {
      if (dashes >= 2 && ch == ">") {
        state.tokenize = tokenBase;
        break;
      }
      dashes = (ch == "-") ? dashes + 1 : 0;
    }
    return ret("comment", "comment");
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, ch;
      while ((ch = stream.next()) != null) {
        if (ch == quote && !escaped)
          break;
        escaped = !escaped && ch == "\\";
      }
      if (!escaped) state.tokenize = tokenBase;
      return ret("string", "string");
    };
  }

  return {
    startState: function(base) {
      return {tokenize: tokenBase,
              baseIndent: base || 0,
              stack: []};
    },

    token: function(stream, state) {
      if (stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);

      var context = state.stack[state.stack.length-1];
      if (type == "hash" && context != "rule") style = "string-2";
      else if (style == "variable") {
        if (context == "rule") style = "number";
        else if (!context || context == "@media{") style = "tag";
      }

      if (context == "rule" && /^[\{\};]$/.test(type))
        state.stack.pop();
      if (type == "{") {
        if (context == "@media") state.stack[state.stack.length-1] = "@media{";
        else state.stack.push("{");
      }
      else if (type == "}") state.stack.pop();
      else if (type == "@media") state.stack.push("@media");
      else if (context == "{" && type != "comment") state.stack.push("rule");
      return style;
    },

    indent: function(state, textAfter) {
      var n = state.stack.length;
      if (/^\}/.test(textAfter))
        n -= state.stack[state.stack.length-1] == "rule" ? 2 : 1;
      return state.baseIndent + n * indentUnit;
    },

    electricChars: "}"
  };
});

CodeMirror.defineMIME("text/css", "css");
/*
LESS mode - http://www.lesscss.org/
Ported to CodeMirror by Peter Kroon
*/


CodeMirror.defineMode("css", function(config) {
  var indentUnit = config.indentUnit, type;
  function ret(style, tp) {type = tp; return style;}
  //html5 tags
  var tags = ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","command","datalist","dd","del","details","dfn","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","keygen","kbd","label","legend","li","link","map","mark","menu","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"];

  function inTagsArray(val){
    for(var i=0; i<tags.length; i++){
      if(val === tags[i]){
        return true;
      }
    }
  }

  function tokenBase(stream, state) {
    var ch = stream.next();

  if (ch == "@") {stream.eatWhile(/[\w\-]/); return ret("meta", stream.current());}
    else if (ch == "/" && stream.eat("*")) {
      state.tokenize = tokenCComment;
      return tokenCComment(stream, state);
    }
    else if (ch == "<" && stream.eat("!")) {
      state.tokenize = tokenSGMLComment;
      return tokenSGMLComment(stream, state);
    }
    else if (ch == "=") ret(null, "compare");
    else if ((ch == "~" || ch == "|") && stream.eat("=")) return ret(null, "compare");
    else if (ch == "\"" || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    }
  else if (ch == "/") { // lesscss e.g.: .png will not be parsed as a class
    if(stream.eat("/")){
    state.tokenize = tokenSComment
        return tokenSComment(stream, state);
    }else{
      stream.eatWhile(/[\a-zA-Z0-9\-_.\s]/);
    if(/\/|\)|#/.test(stream.peek() || stream.eol() || (stream.eatSpace() && stream.peek() == ")")))return ret("string", "string");//let url(/images/logo.png) without quotes return as string
        return ret("number", "unit");
    }
    }
    else if (ch == "!") {
      stream.match(/^\s*\w*/);
      return ret("keyword", "important");
    }
    else if (/\d/.test(ch)) {
      stream.eatWhile(/[\w.%]/);
      return ret("number", "unit");
    }
    else if (/[,+<>*\/]/.test(ch)) {//removed . dot character original was [,.+>*\/]
      return ret(null, "select-op");
    }
    else if (/[;{}:\[\]()]/.test(ch)) { //added () char for lesscss original was [;{}:\[\]]
      if(ch == ":"){
    stream.eatWhile(/[active|hover|link|visited]/);
    if( stream.current().match(/active|hover|link|visited/)){
      return ret("tag", "tag");
    }else{
      return ret(null, ch);
    }
    }else{
        return ret(null, ch);
    }
    }
  else if (ch == ".") { // lesscss
    stream.eatWhile(/[\a-zA-Z0-9\-_]/);
      return ret("tag", "tag");
    }
  else if (ch == "#") { // lesscss
    //we don't eat white-space, we want the hex color and or id only
    stream.eatWhile(/[A-Za-z0-9]/);
    //check if there is a proper hex color length e.g. #eee || #eeeEEE
    if(stream.current().length ===4 || stream.current().length ===7){
      if(stream.current().match(/[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}/,false) != null){//is there a valid hex color value present in the current stream
        //when not a valid hex value, parse as id
      if(stream.current().substring(1) != stream.current().match(/[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}/,false))return ret("atom", "tag");
      //eat white-space
      stream.eatSpace();
      //when hex value declaration doesn't end with [;,] but is does with a slash/cc comment treat it as an id, just like the other hex values that don't end with[;,]
      if( /[\/<>.(){!$%^&*_\-\\?=+\|#'~`]/.test(stream.peek()) )return ret("atom", "tag");
      //#time { color: #aaa }
      else if(stream.peek() == "}" )return ret("number", "unit");
      //we have a valid hex color value, parse as id whenever an element/class is defined after the hex(id) value e.g. #eee aaa || #eee .aaa
      else if( /[a-zA-Z\\]/.test(stream.peek()) )return ret("atom", "tag");
      //when a hex value is on the end of a line, parse as id
      else if(stream.eol())return ret("atom", "tag");
      //default
      else return ret("number", "unit");
      }else{//when not a valid hexvalue in the current stream e.g. #footer
      stream.eatWhile(/[\w\\\-]/);
      return ret("atom", "tag");
      }
    }else{
    stream.eatWhile(/[\w\\\-]/);
    return ret("atom", "tag");
    }
    }
  else if (ch == "&") {
    stream.eatWhile(/[\w\-]/);
    return ret(null, ch);
  }
    else {
      stream.eatWhile(/[\w\\\-_%.{]/);
    if(stream.current().match(/http|https/) != null){
    stream.eatWhile(/[\w\\\-_%.{:\/]/);
    return ret("string", "string");
    }else if(stream.peek() == "<" || stream.peek() == ">"){
    return ret("tag", "tag");
    }else if( stream.peek().match(/\(/) != null ){// lessc
    return ret(null, ch);
    }else if (stream.peek() == "/" && state.stack[state.stack.length-1] != undefined){ // url(dir/center/image.png)
      return ret("string", "string");
    }else if( stream.current().match(/\-\d|\-.\d/) ){ // lesscss match e.g.: -5px -0.4 etc... only colorize the minus sign
    //stream.backUp(stream.current().length-1); //commment out these 2 comment if you want the minus sign to be parsed as null -500px
      //return ret(null, ch);
    return ret("number", "unit");
    }else if( inTagsArray(stream.current()) ){ // lesscss match html tags
      return ret("tag", "tag");
    }else if( /\/|[\s\)]/.test(stream.peek() || stream.eol() || (stream.eatSpace() && stream.peek() == "/")) && stream.current().indexOf(".") !== -1){
    if(stream.current().substring(stream.current().length-1,stream.current().length) == "{"){
      stream.backUp(1);
      return ret("tag", "tag");
    }//end if
    if( (stream.eatSpace() && stream.peek().match(/[{<>.a-zA-Z]/) != null)  || stream.eol() )return ret("tag", "tag");//e.g. button.icon-plus
    return ret("string", "string");//let url(/images/logo.png) without quotes return as string
    }else if( stream.eol() ){
      if(stream.current().substring(stream.current().length-1,stream.current().length) == "{")stream.backUp(1);
      return ret("tag", "tag");
    }else{
        return ret("variable", "variable");
    }
    }

  }

  function tokenSComment(stream, state) {// SComment = Slash comment
    stream.skipToEnd();
  state.tokenize = tokenBase;
    return ret("comment", "comment");
  }

  function tokenCComment(stream, state) {
    var maybeEnd = false, ch;
    while ((ch = stream.next()) != null) {
      if (maybeEnd && ch == "/") {
        state.tokenize = tokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ret("comment", "comment");
  }

  function tokenSGMLComment(stream, state) {
    var dashes = 0, ch;
    while ((ch = stream.next()) != null) {
      if (dashes >= 2 && ch == ">") {
        state.tokenize = tokenBase;
        break;
      }
      dashes = (ch == "-") ? dashes + 1 : 0;
    }
    return ret("comment", "comment");
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, ch;
      while ((ch = stream.next()) != null) {
        if (ch == quote && !escaped)
          break;
        escaped = !escaped && ch == "\\";
      }
      if (!escaped) state.tokenize = tokenBase;
      return ret("string", "string");
    };
  }

  return {
    startState: function(base) {
      return {tokenize: tokenBase,
              baseIndent: base || 0,
              stack: []};
    },

    token: function(stream, state) {
      if (stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);

      var context = state.stack[state.stack.length-1];
      if (type == "hash" && context == "rule") style = "atom";
      else if (style == "variable") {
        if (context == "rule") style = null; //"tag"
        else if (!context || context == "@media{"){
      style = stream.current()  == "when"   ? "variable"  :
      stream.string.match(/#/g)   != undefined  ? null    :
      /[\s,|\s\)]/.test(stream.peek())    ? "tag"   : null;
    }
      }

      if (context == "rule" && /^[\{\};]$/.test(type))
        state.stack.pop();
      if (type == "{") {
        if (context == "@media") state.stack[state.stack.length-1] = "@media{";
        else state.stack.push("{");
      }
      else if (type == "}") state.stack.pop();
      else if (type == "@media") state.stack.push("@media");
      else if (context == "{" && type != "comment") state.stack.push("rule");
      return style;
    },

    indent: function(state, textAfter) {
      var n = state.stack.length;
      if (/^\}/.test(textAfter))
        n -= state.stack[state.stack.length-1] == "rule" ? 2 : 1;
      return state.baseIndent + n * indentUnit;
    },

    electricChars: "}"
  };
});

CodeMirror.defineMIME("text/x-less", "less");
if (!CodeMirror.mimeModes.hasOwnProperty("text/css"))
  CodeMirror.defineMIME("text/css", "less");
// Supported keybindings:
//
// Cursor movement:
// h, j, k, l
// e, E, w, W, b, B
// Ctrl-f, Ctrl-b
// Ctrl-n, Ctrl-p
// $, ^, 0
// G
// ge, gE
// gg
// f<char>, F<char>, t<char>, T<char>
// Ctrl-o, Ctrl-i TODO (FIXME - Ctrl-O wont work in Chrome)
// /, ?, n, N TODO (does not work)
// #, * TODO
//
// Entering insert mode:
// i, I, a, A, o, O
// s
// ce, cb (without support for number of actions like c3e - TODO)
// cc
// S, C TODO
// cf<char>, cF<char>, ct<char>, cT<char>
//
// Deleting text:
// x, X
// J
// dd, D
// de, db (without support for number of actions like d3e - TODO)
// df<char>, dF<char>, dt<char>, dT<char>
//
// Yanking and pasting:
// yy, Y
// p, P
// p'<char> TODO - test
// y'<char> TODO - test
// m<char> TODO - test
//
// Changing text in place:
// ~
// r<char>
//
// Visual mode:
// v, V TODO
//
// Misc:
// . TODO
//


(function() {
  var count = "";
  var sdir = "f";
  var buf = "";
  var yank = 0;
  var mark = [];
  function emptyBuffer() { buf = ""; }
  function pushInBuffer(str) { buf += str; };
  function pushCountDigit(digit) { return function(cm) {count += digit;} }
  function popCount() { var i = parseInt(count); count = ""; return i || 1; }
  function iterTimes(func) {
    for (var i = 0, c = popCount(); i < c; ++i) func(i, i == c - 1);
  }
  function countTimes(func) {
    if (typeof func == "string") func = CodeMirror.commands[func];
    return function(cm) { iterTimes(function () { func(cm); }) };
  }

  function iterObj(o, f) {
    for (var prop in o) if (o.hasOwnProperty(prop)) f(prop, o[prop]);
  }
  function iterList(l, f) {
    for (var i in l) f(l[i]);
  }
  function toLetter(ch) {
    // T -> t, Shift-T -> T, '*' -> *, "Space" -> " "
    if (ch.slice(0, 6) == "Shift-") {
      return ch.slice(0, 1);
    } else {
      if (ch == "Space") return " ";
      if (ch.length == 3 && ch[0] == "'" && ch[2] == "'") return ch[1];
      return ch.toLowerCase();
    }
  }
  var SPECIAL_SYMBOLS = "~`!@#$%^&*()_-+=[{}]\\|/?.,<>:;\"\'1234567890";
  function toCombo(ch) {
    // t -> T, T -> Shift-T, * -> '*', " " -> "Space"
    if (ch == " ") return "Space";
    var specialIdx = SPECIAL_SYMBOLS.indexOf(ch);
    if (specialIdx != -1) return "'" + ch + "'";
    if (ch.toLowerCase() == ch) return ch.toUpperCase();
    return "Shift-" + ch.toUpperCase();
  }

  var word = [/\w/, /[^\w\s]/], bigWord = [/\S/];
  function findWord(line, pos, dir, regexps) {
    var stop = 0, next = -1;
    if (dir > 0) { stop = line.length; next = 0; }
    var start = stop, end = stop;
    // Find bounds of next one.
    outer: for (; pos != stop; pos += dir) {
      for (var i = 0; i < regexps.length; ++i) {
        if (regexps[i].test(line.charAt(pos + next))) {
          start = pos;
          for (; pos != stop; pos += dir) {
            if (!regexps[i].test(line.charAt(pos + next))) break;
          }
          end = pos;
          break outer;
        }
      }
    }
    return {from: Math.min(start, end), to: Math.max(start, end)};
  }
  function moveToWord(cm, regexps, dir, where) {
    var cur = cm.getCursor(), ch = cur.ch, line = cm.getLine(cur.line), word;
    while (true) {
      word = findWord(line, ch, dir, regexps);
      ch = word[where == "end" ? "to" : "from"];
      if (ch == cur.ch && word.from != word.to) ch = word[dir < 0 ? "from" : "to"];
      else break;
    }
    cm.setCursor(cur.line, word[where == "end" ? "to" : "from"], true);
  }
  function joinLineNext(cm) {
    var cur = cm.getCursor(), ch = cur.ch, line = cm.getLine(cur.line);
    CodeMirror.commands.goLineEnd(cm);
    if (cur.line != cm.lineCount()) {
      CodeMirror.commands.goLineEnd(cm);
      cm.replaceSelection(" ", "end");
      CodeMirror.commands.delCharRight(cm);
    }
  }
  function delTillMark(cm, cHar) {
    var i = mark[cHar];
    if (i === undefined) {
      // console.log("Mark not set"); // TODO - show in status bar
      return;
    }
    var l = cm.getCursor().line, start = i > l ? l : i, end = i > l ? i : l;
    cm.setCursor(start);
    for (var c = start; c <= end; c++) {
      pushInBuffer("\n"+cm.getLine(start));
      cm.removeLine(start);
    }
  }
  function yankTillMark(cm, cHar) {
    var i = mark[cHar];
    if (i === undefined) {
      // console.log("Mark not set"); // TODO - show in status bar
      return;
    }
    var l = cm.getCursor().line, start = i > l ? l : i, end = i > l ? i : l;
    for (var c = start; c <= end; c++) {
      pushInBuffer("\n"+cm.getLine(c));
    }
    cm.setCursor(start);
  }
  function goLineStartText(cm) {
    // Go to the start of the line where the text begins, or the end for whitespace-only lines
    var cur = cm.getCursor(), firstNonWS = cm.getLine(cur.line).search(/\S/);
    cm.setCursor(cur.line, firstNonWS == -1 ? line.length : firstNonWS, true);
  }

  function charIdxInLine(cm, cHar, motion_options) {
    // Search for cHar in line.
    // motion_options: {forward, inclusive}
    // If inclusive = true, include it too.
    // If forward = true, search forward, else search backwards.
    // If char is not found on this line, do nothing
    var cur = cm.getCursor(), line = cm.getLine(cur.line), idx;
    var ch = toLetter(cHar), mo = motion_options;
    if (mo.forward) {
      idx = line.indexOf(ch, cur.ch + 1);
      if (idx != -1 && mo.inclusive) idx += 1;
    } else {
      idx = line.lastIndexOf(ch, cur.ch);
      if (idx != -1 && !mo.inclusive) idx += 1;
    }
    return idx;
  }

  function moveTillChar(cm, cHar, motion_options) {
    // Move to cHar in line, as found by charIdxInLine.
    var idx = charIdxInLine(cm, cHar, motion_options), cur = cm.getCursor();
    if (idx != -1) cm.setCursor({line: cur.line, ch: idx});
  }

  function delTillChar(cm, cHar, motion_options) {
    // delete text in this line, untill cHar is met,
    // as found by charIdxInLine.
    // If char is not found on this line, do nothing
    var idx = charIdxInLine(cm, cHar, motion_options);
    var cur = cm.getCursor();
    if (idx !== -1) {
      if (motion_options.forward) {
        cm.replaceRange("", {line: cur.line, ch: cur.ch}, {line: cur.line, ch: idx});
      } else {
        cm.replaceRange("", {line: cur.line, ch: idx}, {line: cur.line, ch: cur.ch});
      }
    }
  }

  function enterInsertMode(cm) {
    // enter insert mode: switch mode and cursor
    if (!cm) console.log("call enterInsertMode with 'cm' as an argument");
    popCount();
    cm.setOption("keyMap", "vim-insert");
  }

  // main keymap
  var map = CodeMirror.keyMap.vim = {
    // Pipe (|); TODO: should be *screen* chars, so need a util function to turn tabs into spaces?
    "'|'": function(cm) {
      cm.setCursor(cm.getCursor().line, popCount() - 1, true);
    },
    "'^'": function(cm) { popCount(); goLineStartText(cm);},
    "A": function(cm) {
      cm.setCursor(cm.getCursor().line, cm.getCursor().ch+1, true);
      enterInsertMode(cm);
    },
    "Shift-A": function(cm) { CodeMirror.commands.goLineEnd(cm); enterInsertMode(cm);},
    "I": function(cm) { enterInsertMode(cm);},
    "Shift-I": function(cm) { goLineStartText(cm); enterInsertMode(cm);},
    "O": function(cm) {
      CodeMirror.commands.goLineEnd(cm);
      CodeMirror.commands.newlineAndIndent(cm);
      enterInsertMode(cm);
    },
    "Shift-O": function(cm) {
      CodeMirror.commands.goLineStart(cm);
      cm.replaceSelection("\n", "start");
      cm.indentLine(cm.getCursor().line);
      enterInsertMode(cm);
    },
    "G": function(cm) { cm.setOption("keyMap", "vim-prefix-g");},
    "Shift-D": function(cm) {
      // commented out verions works, but I left original, cause maybe
      // I don't know vim enouth to see what it does
      /* var cur = cm.getCursor();
      var f = {line: cur.line, ch: cur.ch}, t = {line: cur.line};
      pushInBuffer(cm.getRange(f, t));
      cm.replaceRange("", f, t);
      */
      emptyBuffer();
      mark["Shift-D"] = cm.getCursor(false).line;
      cm.setCursor(cm.getCursor(true).line);
      delTillMark(cm,"Shift-D"); mark = [];
    },

    "S": function (cm) {
      countTimes(function (_cm) {
        CodeMirror.commands.delCharRight(_cm);
      })(cm);
      enterInsertMode(cm);
    },
    "M": function(cm) {cm.setOption("keyMap", "vim-prefix-m"); mark = [];},
    "Y": function(cm) {cm.setOption("keyMap", "vim-prefix-y"); emptyBuffer(); yank = 0;},
    "Shift-Y": function(cm) {
      emptyBuffer();
      mark["Shift-D"] = cm.getCursor(false).line;
      cm.setCursor(cm.getCursor(true).line);
      yankTillMark(cm,"Shift-D"); mark = [];
    },
    "/": function(cm) {var f = CodeMirror.commands.find; f && f(cm); sdir = "f";},
    "'?'": function(cm) {
      var f = CodeMirror.commands.find;
      if (f) { f(cm); CodeMirror.commands.findPrev(cm); sdir = "r"; }
    },
    "N": function(cm) {
      var fn = CodeMirror.commands.findNext;
      if (fn) sdir != "r" ? fn(cm) : CodeMirror.commands.findPrev(cm);
    },
    "Shift-N": function(cm) {
      var fn = CodeMirror.commands.findNext;
      if (fn) sdir != "r" ? CodeMirror.commands.findPrev(cm) : fn.findNext(cm);
    },
    "Shift-G": function(cm) {
      count == "" ? cm.setCursor(cm.lineCount()) : cm.setCursor(parseInt(count)-1);
      popCount();
      CodeMirror.commands.goLineStart(cm);
    },
    "'$'": function (cm) {
      countTimes("goLineEnd")(cm);
      if (cm.getCursor().ch) CodeMirror.commands.goColumnLeft(cm);
    },
    nofallthrough: true, style: "fat-cursor"
  };

  // standard mode switching
  iterList(["d", "t", "T", "f", "F", "c", "r"],
      function (ch) {
        CodeMirror.keyMap.vim[toCombo(ch)] = function (cm) {
          cm.setOption("keyMap", "vim-prefix-" + ch);
          emptyBuffer();
        };
      });

  function addCountBindings(keyMap) {
    // Add bindings for number keys
    keyMap["0"] = function(cm) {
      count.length > 0 ? pushCountDigit("0")(cm) : CodeMirror.commands.goLineStart(cm);
    };
    for (var i = 1; i < 10; ++i) keyMap[i] = pushCountDigit(i);
  }
  addCountBindings(CodeMirror.keyMap.vim);

  // main num keymap
  // Add bindings that are influenced by number keys
  iterObj({
    "H": "goColumnLeft", "L": "goColumnRight", "J": "goLineDown",
    "K": "goLineUp", "Left": "goColumnLeft", "Right": "goColumnRight",
    "Down": "goLineDown", "Up": "goLineUp", "Backspace": "goCharLeft",
    "Space": "goCharRight",
    "B": function(cm) {moveToWord(cm, word, -1, "end");},
    "E": function(cm) {moveToWord(cm, word, 1, "end");},
    "W": function(cm) {moveToWord(cm, word, 1, "start");},
    "Shift-B": function(cm) {moveToWord(cm, bigWord, -1, "end");},
    "Shift-E": function(cm) {moveToWord(cm, bigWord, 1, "end");},
    "Shift-W": function(cm) {moveToWord(cm, bigWord, 1, "start");},
    "X": function(cm) {CodeMirror.commands.delCharRight(cm);},
    "P": function(cm) {
      var cur = cm.getCursor().line;
      if (buf!= "") {
        CodeMirror.commands.goLineEnd(cm);
        cm.replaceSelection(buf, "end");
      }
      cm.setCursor(cur+1);
    },
    "Shift-X": function(cm) {CodeMirror.commands.delCharLeft(cm);},
    "Shift-J": function(cm) {joinLineNext(cm);},
    "Shift-P": function(cm) {
      var cur = cm.getCursor().line;
      if (buf!= "") {
        CodeMirror.commands.goLineUp(cm);
        CodeMirror.commands.goLineEnd(cm);
        cm.replaceSelection(buf, "end");
      }
      cm.setCursor(cur+1);
    },
    "'~'": function(cm) {
      var cur = cm.getCursor(), cHar = cm.getRange({line: cur.line, ch: cur.ch}, {line: cur.line, ch: cur.ch+1});
      cHar = cHar != cHar.toLowerCase() ? cHar.toLowerCase() : cHar.toUpperCase();
      cm.replaceRange(cHar, {line: cur.line, ch: cur.ch}, {line: cur.line, ch: cur.ch+1});
      cm.setCursor(cur.line, cur.ch+1);
    },
    "Ctrl-B": function(cm) {CodeMirror.commands.goPageUp(cm);},
    "Ctrl-F": function(cm) {CodeMirror.commands.goPageDown(cm);},
    "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
    "U": "undo", "Ctrl-R": "redo"
  }, function(key, cmd) { map[key] = countTimes(cmd); });

  // empty key maps
  iterList([
      "vim-prefix-d'",
      "vim-prefix-y'",
      "vim-prefix-df",
      "vim-prefix-dF",
      "vim-prefix-dt",
      "vim-prefix-dT",
      "vim-prefix-c",
      "vim-prefix-cf",
      "vim-prefix-cF",
      "vim-prefix-ct",
      "vim-prefix-cT",
      "vim-prefix-",
      "vim-prefix-f",
      "vim-prefix-F",
      "vim-prefix-t",
      "vim-prefix-T",
      "vim-prefix-r",
      "vim-prefix-m"
      ],
      function (prefix) {
        CodeMirror.keyMap[prefix] = {
          auto: "vim",
          nofallthrough: true
        };
      });

  CodeMirror.keyMap["vim-prefix-g"] = {
    "E": countTimes(function(cm) { moveToWord(cm, word, -1, "start");}),
    "Shift-E": countTimes(function(cm) { moveToWord(cm, bigWord, -1, "start");}),
    "G": function (cm) { cm.setCursor({line: 0, ch: cm.getCursor().ch});},
    auto: "vim", nofallthrough: true, style: "fat-cursor"
  };

  CodeMirror.keyMap["vim-prefix-d"] = {
    "D": countTimes(function(cm) {
      pushInBuffer("\n"+cm.getLine(cm.getCursor().line));
      cm.removeLine(cm.getCursor().line);
    }),
    "'": function(cm) {
      cm.setOption("keyMap", "vim-prefix-d'");
      emptyBuffer();
    },
    "E": countTimes("delWordRight"),
    "B": countTimes("delWordLeft"),
    auto: "vim", nofallthrough: true, style: "fat-cursor"
  };
  // FIXME - does not work for bindings like "d3e"
  addCountBindings(CodeMirror.keyMap["vim-prefix-d"]);

  CodeMirror.keyMap["vim-prefix-c"] = {
    "E": function (cm) {
      countTimes("delWordRight")(cm);
      enterInsertMode(cm);
    },
    "B": function (cm) {
      countTimes("delWordLeft")(cm);
      enterInsertMode(cm);
    },
    "C": function (cm) {
      iterTimes(function (i, last) {
        CodeMirror.commands.deleteLine(cm);
        if (i) {
          CodeMirror.commands.delCharRight(cm);
          if (last) CodeMirror.commands.deleteLine(cm);
        }
      });
      enterInsertMode(cm);
    },
    auto: "vim", nofallthrough: true, style: "fat-cursor"
  };

  iterList(["vim-prefix-d", "vim-prefix-c", "vim-prefix-"], function (prefix) {
    iterList(["f", "F", "T", "t"],
      function (ch) {
        CodeMirror.keyMap[prefix][toCombo(ch)] = function (cm) {
          cm.setOption("keyMap", prefix + ch);
          emptyBuffer();
        };
      });
  });

  var MOTION_OPTIONS = {
    "t": {inclusive: false, forward: true},
    "f": {inclusive: true,  forward: true},
    "T": {inclusive: false, forward: false},
    "F": {inclusive: true,  forward: false}
  };

  function setupPrefixBindingForKey(m) {
    CodeMirror.keyMap["vim-prefix-m"][m] = function(cm) {
      mark[m] = cm.getCursor().line;
    };
    CodeMirror.keyMap["vim-prefix-d'"][m] = function(cm) {
      delTillMark(cm,m);
    };
    CodeMirror.keyMap["vim-prefix-y'"][m] = function(cm) {
      yankTillMark(cm,m);
    };
    CodeMirror.keyMap["vim-prefix-r"][m] = function (cm) {
      var cur = cm.getCursor();
      cm.replaceRange(toLetter(m),
          {line: cur.line, ch: cur.ch},
          {line: cur.line, ch: cur.ch + 1});
      CodeMirror.commands.goColumnLeft(cm);
    };
    // all commands, related to motions till char in line
    iterObj(MOTION_OPTIONS, function (ch, options) {
      CodeMirror.keyMap["vim-prefix-" + ch][m] = function(cm) {
        moveTillChar(cm, m, options);
      };
      CodeMirror.keyMap["vim-prefix-d" + ch][m] = function(cm) {
        delTillChar(cm, m, options);
      };
      CodeMirror.keyMap["vim-prefix-c" + ch][m] = function(cm) {
        delTillChar(cm, m, options);
        enterInsertMode(cm);
      };
    });
  };
  for (var i = 65; i < 65 + 26; i++) { // uppercase alphabet char codes
    var ch = String.fromCharCode(i);
    setupPrefixBindingForKey(toCombo(ch));
    setupPrefixBindingForKey(toCombo(ch.toLowerCase()));
  }
  iterList(SPECIAL_SYMBOLS, function (ch) {
    setupPrefixBindingForKey(toCombo(ch));
  });
  setupPrefixBindingForKey("Space");

  CodeMirror.keyMap["vim-prefix-y"] = {
    "Y": countTimes(function(cm) { pushInBuffer("\n"+cm.getLine(cm.getCursor().line+yank)); yank++; }),
    "'": function(cm) {cm.setOption("keyMap", "vim-prefix-y'"); emptyBuffer();},
    auto: "vim", nofallthrough: true, style: "fat-cursor"
  };

  CodeMirror.keyMap["vim-insert"] = {
    // TODO: override navigation keys so that Esc will cancel automatic indentation from o, O, i_<CR>
    "Esc": function(cm) {
      cm.setCursor(cm.getCursor().line, cm.getCursor().ch-1, true);
      cm.setOption("keyMap", "vim");
    },
    "Ctrl-N": "autocomplete",
    "Ctrl-P": "autocomplete",
    fallthrough: ["default"]
  };
})();
(function() {

  _.def("Luca.tools.ApplicationInspector")["extends"]("Luca.core.Container")["with"]({
    name: "application_inspector"
  });

}).call(this);
(function() {
  var BuffersModel, compilers;

  BuffersModel = Luca.Model.extend({
    defaults: {
      _current: "default",
      _namespace: "default",
      _compiled: []
    },
    initialize: function(attributes) {
      this.attributes = attributes != null ? attributes : {};
      Luca.Model.prototype.initialize.apply(this, arguments);
      return this.fetch({
        silent: true
      });
    },
    requireCompilation: function() {
      return this.get("_compiled");
    },
    bufferKeys: function() {
      var key, value, _ref, _results;
      if (this.bufferNames != null) return this.bufferNames;
      _ref = this.attributes;
      _results = [];
      for (key in _ref) {
        value = _ref[key];
        if (!key.match(/_/)) _results.push(key);
      }
      return _results;
    },
    namespacedBuffer: function(key) {
      return "" + (this.get('_namespace')) + ":" + key;
    },
    bufferValues: function() {
      return _(this.attributes).pick(this.bufferKeys());
    },
    fetch: function(options) {
      var _this = this;
      if (options == null) options = {};
      options.silent || (options.silent = true);
      _(this.bufferKeys()).each(function(key) {
        var value;
        value = typeof localStorage !== "undefined" && localStorage !== null ? localStorage.getItem(_this.namespacedBuffer(key)) : void 0;
        if (value != null) {
          return _this.set(key, value, {
            silent: options.silent === true
          });
        }
      });
      return this;
    },
    persist: function() {
      var _this = this;
      _(this.bufferKeys()).each(function(key) {
        var value;
        value = _this.get(key);
        return typeof localStorage !== "undefined" && localStorage !== null ? localStorage.setItem(_this.namespacedBuffer(key), value) : void 0;
      });
      return this;
    },
    currentContent: function() {
      var current;
      current = this.get("_current");
      return this.get(current);
    }
  });

  compilers = {
    coffeescript: function(code) {
      return CoffeeScript.compile(code, {
        bare: true
      });
    },
    "default": function(code) {
      return code;
    }
  };

  _.def("Luca.tools.CodeEditor")["extends"]("Luca.components.Panel")["with"]({
    name: "code_editor",
    id: "editor_container",
    autoBindEventHandlers: true,
    bodyClassName: "codemirror-wrapper",
    defaultValue: '',
    compilationEnabled: false,
    bufferNamespace: "luca:code",
    namespace: function(set, options) {
      var _ref;
      if (options == null) options = {};
      if (set != null) {
        this.bufferNamespace = set;
        if ((_ref = this.buffers) != null) {
          _ref.set("_namespace", set, {
            silent: options.silent === true
          });
        }
      }
      return this.bufferNamespace;
    },
    initialize: function(options) {
      this.options = options;
      this._super("initialize", this, arguments);
      _.bindAll(this, "onCompiledCodeChange", "onBufferChange", "onEditorChange", "stripTabs");
      this.mode || (this.mode = "coffeescript");
      this.theme || (this.theme = "monokai");
      this.keyMap || (this.keyMap = "vim");
      this.lineWrapping || (this.lineWrapping = true);
      this.compiler = compilers[this.mode] || compilers["default"];
      return this.setupBuffers();
    },
    setWrap: function(lineWrapping) {
      this.lineWrapping = lineWrapping;
      return this.editor.setOption("lineWrapping", this.lineWrapping);
    },
    setMode: function(mode) {
      this.mode = mode;
      this.editor.setOption("mode", this.mode);
      return this;
    },
    setKeyMap: function(keyMap) {
      this.keyMap = keyMap;
      this.editor.setOption("keyMap", this.keyMap);
      return this;
    },
    setTheme: function(theme) {
      this.theme = theme;
      this.editor.setOption("theme", this.theme);
      return this;
    },
    setupBuffers: function() {
      var attributes, editor,
        _this = this;
      attributes = _.extend(this.currentBuffers || {}, {
        _compiled: this.compiledBuffers,
        _namespace: this.namespace()
      });
      this.buffers = new BuffersModel(attributes);
      editor = this;
      _(this.buffers.bufferKeys()).each(function(key) {
        return _this.buffers.bind("change:" + key, function() {
          return _this.onBufferChange.apply(_this, arguments);
        });
      });
      _(this.buffers.requireCompilation()).each(function(key) {
        return _this.buffers.bind("change:compiled_" + key, _this.onCompiledCodeChange);
      });
      this.buffers.bind("change:_current", function(model, value) {
        editor.trigger("buffer:change");
        return editor.editor.setValue(_this.buffers.currentContent() || "");
      });
      return this.monitorChanges = true;
    },
    currentBuffer: function() {
      return this.buffers.get("_current");
    },
    loadBuffer: function(bufferName, autoSave) {
      if (autoSave == null) autoSave = true;
      if (autoSave) this.saveBuffer();
      return this.buffers.set("_current", bufferName);
    },
    saveBuffer: function() {
      localStorage.setItem(this.buffers.namespacedBuffer(this.currentBuffer()), this.editor.getValue());
      return this.buffers.set(this.currentBuffer(), this.editor.getValue());
    },
    getBuffer: function(buffer, compiled) {
      var code, compiledCode;
      if (compiled == null) compiled = false;
      buffer || (buffer = this.currentBuffer());
      code = this.buffers.get(buffer);
      if (compiled !== true) return code;
      compiledCode = this.buffers.get("compiled_" + buffer);
      if (_.string.isBlank(compiledCode)) {
        compiledCode = this.compileCode(code, buffer);
      }
      return compiledCode;
    },
    editorOptions: function() {
      return {
        mode: this.mode,
        theme: this.theme,
        keyMap: this.keyMap,
        lineNumbers: true,
        gutter: true,
        autofocus: true,
        onChange: this.onEditorChange,
        onKeyEvent: this.stripTabs,
        passDelay: 50,
        autoClearEmptyLines: true,
        smartIndent: false,
        tabSize: 2,
        electricChars: false
      };
    },
    beforeRender: function() {
      var styles, _ref;
      if ((_ref = Luca.components.Panel.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      styles = {
        "min-height": this.minHeight,
        background: '#272822',
        color: '#f8f8f2'
      };
      this.$bodyEl().css(styles);
      return this.$html("<textarea></textarea>");
    },
    afterRender: function() {
      var _this = this;
      return _.defer(function() {
        _this.editor = window.CodeMirror.fromTextArea(_this.$('textarea')[0], _this.editorOptions());
        _this.restore();
        return _this.enableTabStripping = true;
      });
    },
    save: function() {
      return this.saveBuffer();
    },
    restore: function() {
      this.editor.setValue("");
      return this.editor.refresh();
    },
    replaceTabWithSpace: function() {},
    stripTabs: function(editor, keyEvent) {
      var cleansed, coords;
      if ((keyEvent != null ? keyEvent.keyCode : void 0) === 9) {
        coords = this.editor.cursorCoords();
        cleansed = this.getValue().replace(/\t/g, '  ');
        this.setValue(cleansed);
        this.editor.setCursor(coords);
      }
      return false;
    },
    onEditorChange: function() {
      if (this.monitorChanges) return this.save();
    },
    onBufferChange: function(model, newValue, changes) {
      var previous,
        _this = this;
      previous = model.previousAttributes();
      _(this.buffers.bufferKeys()).each(function(key) {
        var result;
        if (previous[key] !== _this.buffers.get(key)) {
          if (_(_this.buffers.requireCompilation()).include(key)) {
            result = _this.compileCode(_this.buffers.get(key), key);
            if (result.success === true) {
              _this.buffers.persist(key);
              return _this.buffers.set("compiled_" + key, result.compiled, {
                silent: true
              });
            }
          } else {
            _this.trigger("code:change:" + key, _this.buffers.get(key));
            return _this.buffers.persist(key);
          }
        }
      });
      return this.buffers.change();
    },
    onCompiledCodeChange: function(model, newValue, changes) {
      var changed, changedBuffers, _i, _len, _results;
      changedBuffers = _(model.changedAttributes()).keys();
      this.trigger("code:change", changedBuffers);
      _results = [];
      for (_i = 0, _len = changedBuffers.length; _i < _len; _i++) {
        changed = changedBuffers[_i];
        _results.push(this.trigger("code:change:" + changed, changed));
      }
      return _results;
    },
    compileCode: function(code, buffer) {
      var compiled, result;
      buffer || (buffer = this.currentBuffer());
      code || (code = this.getBuffer(buffer, false));
      compiled = "";
      result = {
        success: true,
        compiled: ""
      };
      try {
        compiled = this.compiler.call(this, code);
        this.trigger("compile:success", code, compiled);
        result.compiled = compiled;
      } catch (error) {
        this.trigger("compile:error", error, code);
        result.success = false;
        result.compiled = this.buffers.get("compiled_" + buffer);
      }
      return result;
    },
    getCompiledCode: function(buffer) {
      buffer = this.getBuffer(buffer);
      return _.string.strip(this.compileCode(buffer));
    },
    getValue: function() {
      return this.editor.getValue();
    },
    setValue: function(value) {
      value = value.replace(/\t/g, '  ');
      return this.editor.setValue(value);
    }
  });

}).call(this);
(function() {
  var defaultOptions;

  defaultOptions = {
    readOnly: false,
    lineNumbers: true,
    gutter: true,
    autofocus: false,
    passDelay: 50,
    autoClearEmptyLines: true,
    smartIndent: false,
    tabSize: 2,
    electricChars: false
  };

  Luca.define("Luca.tools.CodeMirrorField")["extends"]("Luca.components.Panel")["with"]({
    bodyClassName: "codemirror-wrapper",
    preProcessors: [],
    postProcessors: [],
    codemirrorOptions: function() {
      var customOptions, options,
        _this = this;
      options = _.clone(defaultOptions);
      customOptions = {
        mode: this.mode || "coffeescript",
        theme: this.theme || "monokai",
        keyMap: this.keyMap || "basic",
        lineNumbers: this.lineNumbers != null ? this.lineNumbers : defaultOptions.lineNumbers,
        readOnly: this.readOnly != null ? this.readOnly : defaultOptions.readOnly,
        gutter: this.gutter != null ? this.gutter : defaultOptions.gutter,
        lineWrapping: this.lineWrapping === true,
        onChange: function() {
          var _ref;
          _this.trigger("editor:change", _this);
          return (_ref = _this.onEditorChange) != null ? _ref.call(_this) : void 0;
        }
      };
      if (this.onKeyEvent != null) {
        customOptions.onKeyEvent = _.bind(this.onKeyEvent, this);
      }
      return _.extend(options, customOptions);
    },
    getCodeMirror: function() {
      return this.instance;
    },
    getValue: function(processed) {
      var value;
      if (processed == null) processed = true;
      return value = this.getCodeMirror().getValue();
    },
    setValue: function(value, processed) {
      if (value == null) value = "";
      if (processed == null) processed = true;
      return this.getCodeMirror().setValue(value);
    },
    afterRender: function() {
      this.instance = CodeMirror(this.$bodyEl()[0], this.codemirrorOptions());
      this.setMaxHeight();
      return this.setHeight();
    },
    setMaxHeight: function(maxHeight, grow) {
      if (maxHeight == null) maxHeight = void 0;
      if (grow == null) grow = true;
      maxHeight || (maxHeight = this.maxHeight);
      if (maxHeight == null) return;
      this.$('.CodeMirror-scroll').css('max-height', maxHeight);
      if (grow === true) {
        return this.$('.CodeMirror-scroll').css('height', maxHeight);
      }
    },
    setHeight: function(height) {
      if (height == null) height = void 0;
      if (height != null) {
        return this.$('.CodeMirror-scroll').css('height', height);
      }
    }
  });

}).call(this);
(function() {

  _.def("Luca.tools.CoffeeEditor")["extends"]("Luca.tools.CodeMirrorField")["with"]({
    name: "coffeescript_editor",
    autoCompile: true,
    compileOptions: {
      bare: true
    },
    hooks: ["editor:change"],
    initialize: function(options) {
      var editor;
      this.options = options;
      Luca.tools.CodeMirrorField.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "editorChange", "toggleSource");
      editor = this;
      this.state = new Luca.Model({
        currentMode: "coffeescript",
        coffeescript: "",
        javascript: ""
      });
      this.state.bind("change:coffeescript", function(model) {
        var code;
        editor.trigger("change:coffeescript");
        code = model.get("coffeescript");
        return editor.compile(code, function(compiled) {
          return model.set('javascript', compiled);
        });
      });
      this.state.bind("change:javascript", function(model) {
        var _ref;
        return (_ref = editor.onJavascriptChange) != null ? _ref.call(editor, model.get('javascript')) : void 0;
      });
      return this.state.bind("change:currentMode", function(model) {
        if (model.get('currentMode') === "javascript") {
          return editor.setValue(model.get('javascript'));
        } else {
          return editor.setValue(model.get('coffeescript'));
        }
      });
    },
    compile: function(code, callback) {
      var compiled, response;
      response = {};
      code || (code = this.getValue());
      try {
        compiled = CoffeeScript.compile(code, this.compileOptions);
        if (callback != null) callback.call(this, compiled);
        return response = {
          success: true,
          compiled: compiled
        };
      } catch (error) {
        this.trigger("compile:error", error, code);
        return response = {
          success: false,
          compiled: '',
          message: error.message
        };
      }
    },
    toggleMode: function() {
      if (this.currentMode() === "coffeescript") {
        return this.state.set('currentMode', 'javascript');
      } else if (this.currentMode() === "javascript") {
        return this.state.set('currentMode', 'coffeescript');
      }
    },
    currentMode: function() {
      return this.state.get("currentMode");
    },
    getCoffeescript: function() {
      return this.state.get("coffeescript");
    },
    getJavascript: function(recompile) {
      var js, results;
      if (recompile == null) recompile = false;
      js = this.state.get("javascript");
      if (recompile === true || (js != null ? js.length : void 0) === 0) {
        results = this.compile(this.getCoffeescript());
        js = results != null ? results.compiled : void 0;
      }
      return js;
    },
    editorChange: function() {
      if (this.autoCompile === true) {
        return this.state.set(this.currentMode(), this.getValue());
      }
    }
  });

}).call(this);
(function() {

  _.def("Luca.tools.CollectionInspector")["extends"]("Luca.View")["with"]({
    name: "collection_inspector",
    className: "collection-inspector"
  });

}).call(this);
(function() {

  _.def('Luca.app.Components')["extends"]('Luca.Collection')["with"]({
    cachedMethods: ["namespaces", "classes", "roots", "views", "collections", "models"],
    cache_key: "luca_components",
    name: "components",
    initialize: function() {
      this.model = Luca.app.Component;
      return Luca.Collection.prototype.initialize.apply(this, arguments);
    },
    url: function() {
      return "/luca/source-map.js";
    },
    collections: function() {
      return this.select(function(component) {
        return Luca.isCollectionPrototype(component.definition());
      });
    },
    modelClasses: function() {
      return this.select(function(component) {
        return Luca.isModelPrototype(component.definition());
      });
    },
    views: function() {
      return this.select(function(component) {
        return Luca.isViewPrototype(component.definition());
      });
    },
    classes: function() {
      return _.uniq(this.pluck("className"));
    },
    roots: function() {
      return _.uniq(this.invoke("root"));
    },
    namespaces: function() {
      return _.uniq(this.invoke("namespace"));
    },
    asTree: function() {
      var classes, namespaces, roots, tree;
      classes = this.classes();
      namespaces = this.namespaces();
      roots = this.roots();
      tree = _(roots).inject(function(memo, root) {
        var regexp;
        memo[root] || (memo[root] = {});
        regexp = new RegExp("^" + root);
        memo[root] = _(namespaces).select(function(namespace) {
          return regexp.exec(namespace) && _(namespaces).include(namespace) && namespace.split('.').length === 2;
        });
        return memo;
      }, {});
      return _(tree).inject(function(memo, namespaces, root) {
        memo[root] = {};
        _(namespaces).each(function(namespace) {
          return memo[root][namespace] = {};
        });
        return memo;
      }, {});
    }
  });

}).call(this);
(function() {

  _.def("Luca.app.Instances")["extends"]("Luca.Collection")["with"]({
    name: "instances",
    refresh: function(options) {
      var models;
      if (options == null) options = {};
      models = _(Luca.registry.instances()).map(function(instance) {
        return {
          cid: instance.cid,
          name: instance.name,
          ctype: instance.ctype,
          displayName: instance.displayName || instance.prototype.displayName,
          object: instance
        };
      });
      return this.reset(models, options);
    },
    initialize: function(initialModels, options) {
      if (initialModels == null) initialModels = [];
      this.options = options != null ? options : {};
      this.model = Luca.app.Instance;
      return Luca.Collection.prototype.initialize.apply(this, arguments);
    }
  });

}).call(this);
(function() {
  var ComponentPicker, bufferNames, compiledBuffers, defaults;

  defaults = {};

  defaults.setup = "# the setup tab contains code which is run every time\n# prior to the 'implementation' run";

  defaults.component = "# the component tab is where you handle the definition of the component\n# that you are trying to test.  it will render its output into the\n# output panel of the code tester\n#\n# example definition:\n#\n# _.def('MyComponent').extends('Luca.View').with\n#   bodyTemplate: 'sample/welcome'";

  defaults.teardown = "# the teardown tab is where you undo / cleanup any of the operations\n# from setup / implementation";

  defaults.implementation = "# the implementation tab is where you specify options for your component.\n#\n# NOTE: the component tester uses whatever is returned from evalulating\n# the code in this tab.  if it responds to render(), it will append\n# render().el to the output panel.  if it is an object, then we will attempt\n# to create an instance of the component you defined with the object as";

  defaults.style = "/*\n * customize the styles that effect this component\n * note, all styles here will be scoped to only effect\n * the output panel :)\n*/";

  defaults.html = "";

  bufferNames = ["setup", "implementation", "component", "style", "html"];

  compiledBuffers = ["setup", "implementation", "component"];

  ComponentPicker = Luca.fields.TypeAheadField.extend({
    name: "component_picker",
    label: "Choose a component to edit",
    initialize: function() {
      this.collection = new Luca.collections.Components();
      this.collection.fetch();
      return this._super("initialize", this, arguments);
    },
    getSource: function() {
      return this.collection.classes();
    },
    change_handler: function() {
      var component, componentDefinition,
        _this = this;
      componentDefinition = this.getValue();
      component = this.collection.find(function(model) {
        return model.get("className") === componentDefinition;
      });
      component.fetch({
        success: function(model, response) {
          if ((response != null ? response.source.length : void 0) > 0) {
            return _this.trigger("component:fetched", response.source, response.className);
          }
        }
      });
      return this.hide();
    },
    createWrapper: function() {
      return this.make("div", {
        "class": "component-picker span4 well",
        style: "position: absolute; z-index:12000"
      });
    },
    show: function() {
      return this.$el.parent().show();
    },
    hide: function() {
      return this.$el.parent().hide();
    },
    toggle: function() {
      return this.$el.parent().toggle();
    }
  });

  _.def("Luca.tools.ComponentTester")["extends"]("Luca.core.Container")["with"]({
    id: "component_tester",
    name: "component_tester",
    autoEvaluateCode: true,
    currentSize: 1,
    sizes: [
      {
        icon: "resize-full",
        value: function() {
          return $(window).height() * 0.3;
        }
      }, {
        icon: "resize-small",
        value: function() {
          return $(window).height() * 0.6;
        }
      }
    ],
    components: [
      {
        ctype: 'card_view',
        name: "component_detail",
        activeCard: 0,
        components: [
          {
            ctype: 'panel',
            name: "component_tester_output",
            bodyTemplate: "component_tester/help"
          }
        ]
      }, {
        ctype: "code_editor",
        name: "ctester_edit",
        className: 'font-large fixed-height',
        minHeight: '350px',
        currentBuffers: defaults,
        compiledBuffers: ["component", "setup", "implementation"],
        topToolbar: {
          buttons: [
            {
              icon: "resize-full",
              align: "right",
              description: "change the size of the component tester editor",
              eventId: "toggle:size"
            }, {
              icon: "pause",
              align: "right",
              description: "Toggle auto-evaluation of test script on code change",
              eventId: "click:autoeval"
            }, {
              icon: "plus",
              description: "add a new component to test",
              eventId: "click:add"
            }, {
              icon: "folder-open",
              description: "open an existing component's definition",
              eventId: "click:open"
            }
          ]
        },
        bottomToolbar: {
          buttons: [
            {
              group: true,
              wrapper: "span4",
              buttons: [
                {
                  label: "View Javascript",
                  description: "Switch between compiled JS and Coffeescript",
                  eventId: "toggle:mode"
                }
              ]
            }, {
              group: true,
              wrapper: "span6 offset4",
              buttons: [
                {
                  label: "Component",
                  eventId: "edit:component",
                  description: "Edit the component itself"
                }, {
                  label: "Setup",
                  eventId: "edit:setup",
                  description: "Edit the setup for your component test"
                }, {
                  label: "Implementation",
                  eventId: "edit:implementation",
                  description: "Implement your component"
                }, {
                  label: "Markup",
                  eventId: "edit:markup",
                  description: "Edit the HTML produced by the component"
                }, {
                  label: "CSS",
                  eventId: "edit:style",
                  description: "Edit CSS"
                }
              ]
            }, {
              group: true,
              align: "right",
              buttons: [
                {
                  icon: "question-sign",
                  align: "right",
                  eventId: "click:help",
                  description: "Help"
                }, {
                  icon: "cog",
                  align: 'right',
                  eventId: "click:settings",
                  description: "component tester settings"
                }, {
                  icon: "eye-close",
                  align: "right",
                  eventId: "click:hide",
                  description: "hide the tester controls"
                }, {
                  icon: "heart",
                  eventId: "click:console",
                  description: "Coffeescript Console",
                  align: "right"
                }
              ]
            }
          ]
        }
      }
    ],
    debugMode: true,
    componentEvents: {
      "ctester_edit click:autoeval": "toggleAutoeval",
      "ctester_edit click:refresh": "refreshCode",
      "ctester_edit click:hide": "toggleControls",
      "ctester_edit click:settings": "toggleSettings",
      "ctester_edit click:add": "addComponent",
      "ctester_edit click:open": "openComponent",
      "ctester_edit click:help": "showHelp",
      "ctester_edit click:console": "toggleConsole",
      "ctester_edit eval:error": "onError",
      "ctester_edit eval:success": "onSuccess",
      "ctester_edit edit:setup": "editSetup",
      "ctester_edit edit:teardown": "editTeardown",
      "ctester_edit edit:component": "editComponent",
      "ctester_edit edit:style": "editStyle",
      "ctester_edit edit:markup": "editMarkup",
      "ctester_edit edit:implementation": "editImplementation",
      "ctester_edit toggle:keymap": "toggleKeymap",
      "ctester_edit toggle:mode": "toggleMode",
      "ctester_edit code:change:html": "onMarkupChange",
      "ctester_edit code:change:style": "onStyleChange",
      "ctester_edit toggle:size": "toggleSize"
    },
    initialize: function() {
      var key, value, _ref;
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      _ref = this.componentEvents;
      for (key in _ref) {
        value = _ref[key];
        this[value] = _.bind(this[value], this);
      }
      return this.defer("editComponent").until("after:render");
    },
    afterRender: function() {
      var changeHandler,
        _this = this;
      changeHandler = _.idleMedium(function() {
        if (_this.autoEvaluateCode === true) return _this.applyTestRun();
      }, 500);
      return this.getEditor().bind("code:change", changeHandler);
    },
    getEditor: function() {
      return Luca("ctester_edit");
    },
    getDetail: function() {
      return Luca("component_detail");
    },
    getOutput: function() {
      return this.getDetail().findComponentByName("component_tester_output");
    },
    onError: function(error, bufferId) {
      return console.log("Error in " + bufferId, error, error.message, error.stack);
    },
    onSuccess: function(result, bufferId) {
      var object;
      if (bufferId === "component") this.componentDefinition = result;
      if (bufferId === "implementation") {
        if (Luca.isBackboneView(result)) {
          object = result;
        } else if (_.isObject(result) && (result.ctype != null)) {
          object = Luca(result);
        } else if (_.isObject(result) && _.isFunction(this.componentDefinition)) {
          object = new this.componentDefinition(result);
        }
        if (Luca.isBackboneView(object)) {
          return this.getOutput().$html(object.render().el);
        }
      }
    },
    applyTestRun: function() {
      var bufferId, code, _ref, _results;
      this.getOutput().$html('');
      _ref = this.getTestRun();
      _results = [];
      for (bufferId in _ref) {
        code = _ref[bufferId];
        _results.push(this.evaluateCode(code, bufferId));
      }
      return _results;
    },
    toggleConsole: function(button) {
      var container;
      this.developmentConsole = Luca("coffeescript-console", function() {
        return new Luca.tools.DevelopmentConsole({
          name: "coffeescript-console"
        });
      });
      if (!this.consoleContainerAppended) {
        container = this.make("div", {
          id: "devtools-console-wrapper",
          "class": "devtools-console-container modal",
          style: "width:900px;height:650px;"
        }, this.developmentConsole.el);
        $('body').append(container);
        this.consoleContainerAppended = true;
        this.developmentConsole.render();
      }
      return $('#devtools-console-wrapper').modal({
        backdrop: false,
        show: true
      });
    },
    toggleAutoeval: function(button) {
      var buttonClass, iconHolder;
      this.autoEvaluateCode = !(this.autoEvaluateCode === true);
      if (!this.started && this.autoEvaluateCode === true) {
        this.started = true;
        this.applyTestRun();
      }
      iconHolder = button.children('i').eq(0);
      buttonClass = this.autoEvaluateCode ? "icon-pause" : "icon-play";
      iconHolder.removeClass();
      iconHolder.addClass(buttonClass);
      return this;
    },
    showEditor: function(options) {
      this.getEditor().$('.toolbar-container.top').toggle(options);
      this.getEditor().$('.codemirror-wrapper').toggle(options);
      return this.trigger("controls:toggled");
    },
    toggleKeymap: function(button) {
      var newMode;
      newMode = this.getEditor().keyMap === "vim" ? "basic" : "vim";
      this.getEditor().setKeyMap(newMode);
      return button.html(_.string.capitalize(newMode));
    },
    toggleMode: function(button) {
      var newMode;
      newMode = this.getEditor().mode === "coffeescript" ? "javascript" : "coffeescript";
      this.getEditor().setMode(newMode);
      button.html(_.string.capitalize((newMode === "coffeescript" ? "View Javascript" : "View Coffeescript")));
      return this.editBuffer(this.currentBufferName, newMode === "javascript");
    },
    toggleSize: function(button) {
      var iconHolder, index, newIcon, newSize;
      index = this.currentSize++ % this.sizes.length;
      newSize = this.sizes[index].value();
      newIcon = this.sizes[index].icon;
      if (button != null) {
        iconHolder = button.children('i').eq(0);
        iconHolder.removeClass().addClass("icon-" + newIcon);
      }
      this.$('.codemirror-wrapper').css('height', "" + (parseInt(newSize)) + "px");
      return this.getEditor().refresh();
    },
    toggleControls: function(button) {
      var _this = this;
      this.bind("controls:toggled", function() {
        var buttonClass, iconHolder;
        iconHolder = button.children('i').eq(0);
        iconHolder.removeClass();
        buttonClass = _this.getEditor().$('.toolbar-container.top').is(":visible") ? "icon-eye-close" : "icon-eye-open";
        return iconHolder.addClass(buttonClass);
      });
      this.showEditor();
      return this;
    },
    toggleSettings: function() {
      return this;
    },
    setValue: function(value, buffer) {
      var compiled;
      if (buffer == null) buffer = "component";
      compiled = this.getEditor().editor.getOption('mode') === "javascript";
      return this.editBuffer(buffer, compiled, false).getEditor().setValue(value);
    },
    editBuffer: function(currentBufferName, compiled, autoSave) {
      var buffer;
      this.currentBufferName = currentBufferName;
      if (compiled == null) compiled = false;
      if (autoSave == null) autoSave = true;
      this.showEditor(true);
      this.highlight(this.currentBufferName);
      buffer = compiled ? "compiled_" + this.currentBufferName : this.currentBufferName;
      this.getEditor().loadBuffer(buffer, autoSave);
      return this;
    },
    editMarkup: function() {
      this.getEditor().setMode('htmlmixed');
      this.getEditor().setWrap(true);
      return this.editBuffer("html").setValue(this.getOutput().$html(), 'html');
    },
    editStyle: function() {
      this.getEditor().setMode('css');
      return this.editBuffer("style");
    },
    editComponent: function() {
      this.getEditor().setMode('coffeescript');
      return this.editBuffer("component");
    },
    editTeardown: function() {
      this.getEditor().setMode('coffeescript');
      return this.editBuffer("teardown");
    },
    editSetup: function() {
      this.getEditor().setMode('coffeescript');
      return this.editBuffer("setup");
    },
    editImplementation: function() {
      this.getEditor().setMode('coffeescript');
      return this.editBuffer("implementation");
    },
    getTestRun: function() {
      var buffer, editor, testRun, _i, _len, _ref;
      editor = this.getEditor();
      testRun = {};
      _ref = ["component", "setup", "implementation"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        buffer = _ref[_i];
        testRun[buffer] = editor.getBuffer(buffer, true);
      }
      return testRun;
    },
    getContext: function() {
      return Luca.util.resolve(this.context || (this.context = "window"));
    },
    evaluateCode: function(code, bufferId, compile) {
      var compiled, evaluator, result;
      if (compile == null) compile = false;
      code || (code = this.getEditor().getValue());
      compiled = compile === true ? this.getEditor().compileCode(code) : code;
      evaluator = function() {
        return eval(compiled);
      };
      try {
        result = evaluator.call(this.getContext());
        return this.onSuccess(result, bufferId, code);
      } catch (error) {
        return this.onError(error, bufferId, code);
      }
    },
    onMarkupChange: function() {
      if (this.autoEvaluateCode === true) {
        return this.getOutput().$html(this.getEditor().getValue());
      }
    },
    onStyleChange: function() {
      var style, styleTag, _ref;
      if (this.autoEvaluateCode === true) {
        $('#component-tester-stylesheet').remove();
        style = (_ref = this.getEditor()) != null ? _ref.getValue() : void 0;
        if (style) {
          styleTag = this.make("style", {
            type: "text/css",
            id: "component-tester-stylesheet"
          });
          $('head').append(styleTag);
          return $(styleTag).append(style);
        }
      }
    },
    showHelp: function() {
      return this.getOutput().$html(Luca.template("component_tester/help", this));
    },
    addComponent: function(button) {},
    openComponent: function(button) {
      var _this = this;
      this.componentPicker || (this.componentPicker = new ComponentPicker());
      this.componentPicker.bind("component:fetched", function(source, component) {
        return _this.setEditorNamespace(component).setValue(source, "component");
      });
      if (!this.getEditor().$('.component-picker').length > 0) {
        this.getEditor().$('.codemirror-wrapper').before(this.componentPicker.createWrapper());
        this.getEditor().$('.component-picker').html(this.componentPicker.render().el);
        this.componentPicker.show();
        return;
      }
      return this.componentPicker.toggle();
    },
    highlight: function(section) {
      this.$("a.btn[data-eventid='edit:" + section + "']").siblings().css('font-weight', 'normal');
      return this.$("a.btn[data-eventid='edit:" + section + "']").css('font-weight', 'bold');
    },
    setEditorNamespace: function(namespace) {
      this.getEditor().namespace(namespace);
      this.getEditor().buffers.fetch();
      return this;
    }
  });

}).call(this);
(function() {
  var codeMirrorOptions;

  codeMirrorOptions = {
    readOnly: true,
    autoFocus: false,
    theme: "monokai",
    mode: "javascript"
  };

  Luca.define("Luca.tools.DevelopmentConsole")["extends"]("Luca.core.Container")["with"]({
    className: "luca-ui-console",
    name: "console",
    history: [],
    historyIndex: 0,
    componentEvents: {
      "code_input key:keyup": "historyUp",
      "code_input key:keydown": "historyDown",
      "code_input key:enter": "runCommand"
    },
    compileOptions: {
      bare: true
    },
    components: [
      {
        ctype: "code_mirror_field",
        name: "code_output",
        readOnly: true,
        lineNumbers: false,
        mode: "javascript",
        height: "621px",
        maxHeight: "621px",
        lineWrapping: true,
        gutter: false
      }, {
        ctype: "text_field",
        name: "code_input",
        lineNumbers: false,
        height: '30px',
        maxHeight: '30px',
        gutter: false,
        autoBindEventHandlers: true,
        hideLabel: true,
        prepend: "Coffee>",
        events: {
          "keypress input": "onKeyEvent",
          "keydown input": "onKeyEvent"
        },
        onKeyEvent: function(keyEvent) {
          if (keyEvent.type === "keypress" && keyEvent.keyCode === Luca.keys.ENTER) {
            this.trigger("key:enter", this.getValue());
          }
          if (keyEvent.type === "keydown" && keyEvent.keyCode === Luca.keys.KEYUP) {
            this.trigger("key:keyup");
          }
          if (keyEvent.type === "keydown" && keyEvent.keyCode === Luca.keys.KEYDOWN) {
            return this.trigger("key:keydown");
          }
        },
        afterRender: function() {
          return this.$('input').focus();
        }
      }
    ],
    show: function(options) {
      if (options == null) options = {};
      return this.$el.addClass('modal').modal(options);
    },
    getContext: function() {
      return window;
    },
    initialize: function() {
      this._super("initialize", this, arguments);
      return _.bindAll(this, "historyUp", "historyDown", "onSuccess", "onError", "runCommand");
    },
    saveHistory: function(command) {
      if ((command != null ? command.length : void 0) > 0) {
        this.history.push(command);
      }
      return this.historyIndex = 0;
    },
    historyUp: function() {
      var currentValue;
      this.historyIndex -= 1;
      if (this.historyIndex < 0) this.historyIndex = 0;
      currentValue = Luca("code_input").getValue();
      return Luca("code_input").setValue(this.history[this.historyIndex] || currentValue);
    },
    historyDown: function() {
      var currentValue;
      this.historyIndex += 1;
      if (this.historyIndex > this.history.length - 1) {
        this.historyIndex = this.history.length - 1;
      }
      currentValue = Luca("code_input").getValue();
      return Luca("code_input").setValue(this.history[this.historyIndex] || currentValue);
    },
    append: function(code, result, skipFormatting) {
      var current, output, payload, source;
      if (skipFormatting == null) skipFormatting = false;
      output = Luca("code_output");
      current = output.getValue();
      if (code != null) source = "// " + code;
      payload = skipFormatting || code.match(/^console\.log/) ? [current, result] : [current, source, result];
      output.setValue(_.compact(payload).join("\n"));
      return output.getCodeMirror().scrollTo(0, 90000);
    },
    onSuccess: function(result, js, coffee) {
      var dump;
      this.saveHistory(coffee);
      dump = JSON.stringify(result, null, "\t");
      dump || (dump = typeof result.toString === "function" ? result.toString() : void 0);
      return this.append(js, dump || "undefined");
    },
    onError: function(error, js, coffee) {
      return this.append(js, "// ERROR: " + error.message);
    },
    evaluateCode: function(code, raw) {
      var dev, evaluator, output, result;
      if (!((code != null ? code.length : void 0) > 0)) return;
      raw = _.string.strip(raw);
      output = Luca("code_output");
      dev = this;
      evaluator = function() {
        var console, log, old_console, result;
        old_console = window.console;
        console = {
          log: function() {
            var arg, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = arguments.length; _i < _len; _i++) {
              arg = arguments[_i];
              _results.push(dev.append(void 0, arg, true));
            }
            return _results;
          }
        };
        log = console.log;
        try {
          result = eval(code);
        } catch (error) {
          window.console = old_console;
          throw error;
        }
        window.console = old_console;
        return result;
      };
      try {
        result = evaluator.call(this.getContext());
        if (!raw.match(/^console\.log/)) return this.onSuccess(result, code, raw);
      } catch (error) {
        return this.onError(error, code, raw);
      }
    },
    runCommand: function() {
      var compile, compiled, dev, raw;
      dev = this;
      compile = _.bind(Luca.tools.CoffeeEditor.prototype.compile, this);
      raw = Luca("code_input").getValue();
      return compiled = compile(raw, function(compiled) {
        return dev.evaluateCode(compiled, raw);
      });
    }
  });

}).call(this);
(function() {

  _.def("Luca.app.Component")["extends"]("Luca.Model")["with"]({
    root: function() {
      return this.get("className").split('.')[0];
    },
    className: function() {
      return this.get("className");
    },
    instances: function() {
      return Luca.registry.findInstancesByClassName(this.className());
    },
    definitionPrototype: function() {
      var _ref;
      return (_ref = this.definition()) != null ? _ref.prototype : void 0;
    },
    parentClasses: function() {
      return Luca.parentClasses(this.className());
    },
    definition: function() {
      return Luca.util.resolve(this.className());
    },
    namespace: function() {
      var parts;
      if (this.get("className") == null) return "";
      parts = this.get("className").split('.');
      parts.pop();
      return parts.join(".");
    }
  });

}).call(this);
(function() {

  _.def("Luca.app.Instance")["extends"]("Luca.Model")["with"]({
    version: 1
  });

}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["component_tester/help"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>Component Tester</h1>\n<p>This is a tool that enables you to build and test Luca components in an isolated sandbox environment.  The editor is currently enabled with vim keybindings</p>\n<h3>Setup</h3>\n<p>This is where you setup any data requirements needed for the test to work.  This is run every time before the implementation code is ran.</p>\n<h3>Teardown</h3>\n<p>This is where you clean up after the tests.  This will be run every time after the implementation code is ran.</p>\n<h3>Definitions</h3>\n<p>This is where you define the component you will be testing.  This is usually the code you will be shipping once you have completed testing.</p>\n<h3>Implementation</h3>\n<p>This is where you create an instance of the component and specify any of the necessary configuration settings. The component will be rendered into the output panel of the component tester.</p>\n');}return __p.join('');};
}).call(this);
(function() {



}).call(this);

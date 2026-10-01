/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-coy&languages=markup+css+clike+javascript+css-extras+javadoclike+jsdoc+js-extras+json+markdown+markup-templating+php+phpdoc+php-extras+scss+sql+typescript&plugins=line-numbers+show-invisibles+autolinker+file-highlight+toolbar+copy-to-clipboard */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = (function (e) {
        var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
            t = 0,
            r = {},
            a = {
                manual: e.Prism && e.Prism.manual,
                disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(n) {
                        return n instanceof i
                            ? new i(n.type, e(n.content), n.alias)
                            : Array.isArray(n)
                            ? n.map(e)
                            : n
                                  .replace(/&/g, "&amp;")
                                  .replace(/</g, "&lt;")
                                  .replace(/\u00a0/g, " ");
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).slice(8, -1);
                    },
                    objId: function (e) {
                        return e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id;
                    },
                    clone: function e(n, t) {
                        var r, i;
                        switch (((t = t || {}), a.util.type(n))) {
                            case "Object":
                                if (((i = a.util.objId(n)), t[i])) return t[i];
                                for (var l in ((r = {}), (t[i] = r), n)) n.hasOwnProperty(l) && (r[l] = e(n[l], t));
                                return r;
                            case "Array":
                                return (
                                    (i = a.util.objId(n)),
                                    t[i]
                                        ? t[i]
                                        : ((r = []),
                                          (t[i] = r),
                                          n.forEach(function (n, a) {
                                              r[a] = e(n, t);
                                          }),
                                          r)
                                );
                            default:
                                return n;
                        }
                    },
                    getLanguage: function (e) {
                        for (; e; ) {
                            var t = n.exec(e.className);
                            if (t) return t[1].toLowerCase();
                            e = e.parentElement;
                        }
                        return "none";
                    },
                    setLanguage: function (e, t) {
                        (e.className = e.className.replace(RegExp(n, "gi"), "")), e.classList.add("language-" + t);
                    },
                    currentScript: function () {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document) return document.currentScript;
                        try {
                            throw new Error();
                        } catch (r) {
                            var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) || [])[1];
                            if (e) {
                                var n = document.getElementsByTagName("script");
                                for (var t in n) if (n[t].src == e) return n[t];
                            }
                            return null;
                        }
                    },
                    isActive: function (e, n, t) {
                        for (var r = "no-" + n; e; ) {
                            var a = e.classList;
                            if (a.contains(n)) return !0;
                            if (a.contains(r)) return !1;
                            e = e.parentElement;
                        }
                        return !!t;
                    },
                },
                languages: {
                    plain: r,
                    plaintext: r,
                    text: r,
                    txt: r,
                    extend: function (e, n) {
                        var t = a.util.clone(a.languages[e]);
                        for (var r in n) t[r] = n[r];
                        return t;
                    },
                    insertBefore: function (e, n, t, r) {
                        var i = (r = r || a.languages)[e],
                            l = {};
                        for (var o in i)
                            if (i.hasOwnProperty(o)) {
                                if (o == n) for (var s in t) t.hasOwnProperty(s) && (l[s] = t[s]);
                                t.hasOwnProperty(o) || (l[o] = i[o]);
                            }
                        var u = r[e];
                        return (
                            (r[e] = l),
                            a.languages.DFS(a.languages, function (n, t) {
                                t === u && n != e && (this[n] = l);
                            }),
                            l
                        );
                    },
                    DFS: function e(n, t, r, i) {
                        i = i || {};
                        var l = a.util.objId;
                        for (var o in n)
                            if (n.hasOwnProperty(o)) {
                                t.call(n, o, n[o], r || o);
                                var s = n[o],
                                    u = a.util.type(s);
                                "Object" !== u || i[l(s)] ? "Array" !== u || i[l(s)] || ((i[l(s)] = !0), e(s, t, o, i)) : ((i[l(s)] = !0), e(s, t, null, i));
                            }
                    },
                },
                plugins: {},
                highlightAll: function (e, n) {
                    a.highlightAllUnder(document, e, n);
                },
                highlightAllUnder: function (e, n, t) {
                    var r = { callback: t, container: e, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };
                    a.hooks.run("before-highlightall", r), (r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector))), a.hooks.run("before-all-elements-highlight", r);
                    for (var i, l = 0; (i = r.elements[l++]); ) a.highlightElement(i, !0 === n, r.callback);
                },
                highlightElement: function (n, t, r) {
                    var i = a.util.getLanguage(n),
                        l = a.languages[i];
                    a.util.setLanguage(n, i);
                    var o = n.parentElement;
                    o && "pre" === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
                    var s = { element: n, language: i, grammar: l, code: n.textContent };
                    function u(e) {
                        (s.highlightedCode = e), a.hooks.run("before-insert", s), (s.element.innerHTML = s.highlightedCode), a.hooks.run("after-highlight", s), a.hooks.run("complete", s), r && r.call(s.element);
                    }
                    if ((a.hooks.run("before-sanity-check", s), (o = s.element.parentElement) && "pre" === o.nodeName.toLowerCase() && !o.hasAttribute("tabindex") && o.setAttribute("tabindex", "0"), !s.code)) return a.hooks.run("complete", s), void (r && r.call(s.element));
                    if ((a.hooks.run("before-highlight", s), s.grammar))
                        if (t && e.Worker) {
                            var c = new Worker(a.filename);
                            (c.onmessage = function (e) {
                                u(e.data);
                            }),
                                c.postMessage(JSON.stringify({ language: s.language, code: s.code, immediateClose: !0 }));
                        } else u(a.highlight(s.code, s.grammar, s.language));
                    else u(a.util.encode(s.code));
                },
                highlight: function (e, n, t) {
                    var r = { code: e, grammar: n, language: t };
                    if ((a.hooks.run("before-tokenize", r), !r.grammar)) throw new Error('The language "' + r.language + '" has no grammar.');
                    return (r.tokens = a.tokenize(r.code, r.grammar)), a.hooks.run("after-tokenize", r), i.stringify(a.util.encode(r.tokens), r.language);
                },
                tokenize: function (e, n) {
                    var t = n.rest;
                    if (t) {
                        for (var r in t) n[r] = t[r];
                        delete n.rest;
                    }
                    var a = new s();
                    return (
                        u(a, a.head, e),
                        o(e, a, n, a.head, 0),
                        (function (e) {
                            for (var n = [], t = e.head.next; t !== e.tail; ) n.push(t.value), (t = t.next);
                            return n;
                        })(a)
                    );
                },
                hooks: {
                    all: {},
                    add: function (e, n) {
                        var t = a.hooks.all;
                        (t[e] = t[e] || []), t[e].push(n);
                    },
                    run: function (e, n) {
                        var t = a.hooks.all[e];
                        if (t && t.length) for (var r, i = 0; (r = t[i++]); ) r(n);
                    },
                },
                Token: i,
            };
        function i(e, n, t, r) {
            (this.type = e), (this.content = n), (this.alias = t), (this.length = 0 | (r || "").length);
        }
        function l(e, n, t, r) {
            e.lastIndex = n;
            var a = e.exec(t);
            if (a && r && a[1]) {
                var i = a[1].length;
                (a.index += i), (a[0] = a[0].slice(i));
            }
            return a;
        }
        function o(e, n, t, r, s, g) {
            for (var f in t)
                if (t.hasOwnProperty(f) && t[f]) {
                    var h = t[f];
                    h = Array.isArray(h) ? h : [h];
                    for (var d = 0; d < h.length; ++d) {
                        if (g && g.cause == f + "," + d) return;
                        var v = h[d],
                            p = v.inside,
                            m = !!v.lookbehind,
                            y = !!v.greedy,
                            k = v.alias;
                        if (y && !v.pattern.global) {
                            var x = v.pattern.toString().match(/[imsuy]*$/)[0];
                            v.pattern = RegExp(v.pattern.source, x + "g");
                        }
                        for (var b = v.pattern || v, w = r.next, A = s; w !== n.tail && !(g && A >= g.reach); A += w.value.length, w = w.next) {
                            var E = w.value;
                            if (n.length > e.length) return;
                            if (!(E instanceof i)) {
                                var P,
                                    L = 1;
                                if (y) {
                                    if (!(P = l(b, A, e, m)) || P.index >= e.length) break;
                                    var S = P.index,
                                        O = P.index + P[0].length,
                                        j = A;
                                    for (j += w.value.length; S >= j; ) j += (w = w.next).value.length;
                                    if (((A = j -= w.value.length), w.value instanceof i)) continue;
                                    for (var C = w; C !== n.tail && (j < O || "string" == typeof C.value); C = C.next) L++, (j += C.value.length);
                                    L--, (E = e.slice(A, j)), (P.index -= A);
                                } else if (!(P = l(b, 0, E, m))) continue;
                                S = P.index;
                                var N = P[0],
                                    _ = E.slice(0, S),
                                    M = E.slice(S + N.length),
                                    W = A + E.length;
                                g && W > g.reach && (g.reach = W);
                                var z = w.prev;
                                if ((_ && ((z = u(n, z, _)), (A += _.length)), c(n, z, L), (w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N))), M && u(n, w, M), L > 1)) {
                                    var I = { cause: f + "," + d, reach: W };
                                    o(e, n, t, w.prev, A, I), g && I.reach > g.reach && (g.reach = I.reach);
                                }
                            }
                        }
                    }
                }
        }
        function s() {
            var e = { value: null, prev: null, next: null },
                n = { value: null, prev: e, next: null };
            (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
        }
        function u(e, n, t) {
            var r = n.next,
                a = { value: t, prev: n, next: r };
            return (n.next = a), (r.prev = a), e.length++, a;
        }
        function c(e, n, t) {
            for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
            (n.next = r), (r.prev = n), (e.length -= a);
        }
        if (
            ((e.Prism = a),
            (i.stringify = function e(n, t) {
                if ("string" == typeof n) return n;
                if (Array.isArray(n)) {
                    var r = "";
                    return (
                        n.forEach(function (n) {
                            r += e(n, t);
                        }),
                        r
                    );
                }
                var i = { type: n.type, content: e(n.content, t), tag: "span", classes: ["token", n.type], attributes: {}, language: t },
                    l = n.alias;
                l && (Array.isArray(l) ? Array.prototype.push.apply(i.classes, l) : i.classes.push(l)), a.hooks.run("wrap", i);
                var o = "";
                for (var s in i.attributes) o += " " + s + '="' + (i.attributes[s] || "").replace(/"/g, "&quot;") + '"';
                return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + o + ">" + i.content + "</" + i.tag + ">";
            }),
            !e.document)
        )
            return e.addEventListener
                ? (a.disableWorkerMessageHandler ||
                      e.addEventListener(
                          "message",
                          function (n) {
                              var t = JSON.parse(n.data),
                                  r = t.language,
                                  i = t.code,
                                  l = t.immediateClose;
                              e.postMessage(a.highlight(i, a.languages[r], r)), l && e.close();
                          },
                          !1
                      ),
                  a)
                : a;
        var g = a.util.currentScript();
        function f() {
            a.manual || a.highlightAll();
        }
        if ((g && ((a.filename = g.src), g.hasAttribute("data-manual") && (a.manual = !0)), !a.manual)) {
            var h = document.readyState;
            "loading" === h || ("interactive" === h && g && g.defer) ? document.addEventListener("DOMContentLoaded", f) : window.requestAnimationFrame ? window.requestAnimationFrame(f) : window.setTimeout(f, 16);
        }
        return a;
    })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
    comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
    prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: { "internal-subset": { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null }, string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 }, punctuation: /^<!|>$|[[\]]/, "doctype-tag": /^DOCTYPE/i, name: /[^\s<>'"]+/ },
    },
    cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
            "special-attr": [],
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [
                        { pattern: /^=/, alias: "attr-equals" },
                        { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
                    ],
                },
            },
            punctuation: /\/?>/,
            "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
        },
    },
    entity: [{ pattern: /&[\da-z]{1,8};/i, alias: "named-entity" }, /&#x?[\da-f]{1,8};/i],
}),
    (Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity),
    (Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup),
    Prism.hooks.add("wrap", function (a) {
        "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function (a, e) {
            var s = {};
            (s["language-" + e] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e] }), (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
            var t = { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
            t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
            var n = {};
            (n[a] = {
                pattern: RegExp(
                    "(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function () {
                        return a;
                    }),
                    "i"
                ),
                lookbehind: !0,
                greedy: !0,
                inside: t,
            }),
                Prism.languages.insertBefore("markup", "cdata", n);
        },
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
        value: function (a, e) {
            Prism.languages.markup.tag.inside["special-attr"].push({
                pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"),
                lookbehind: !0,
                inside: {
                    "attr-name": /^[^\s=]+/,
                    "attr-value": { pattern: /=[\s\S]+/, inside: { value: { pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: !0, alias: [e, "language-" + e], inside: Prism.languages[e] }, punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } },
                },
            });
        },
    }),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup),
    (Prism.languages.xml = Prism.languages.extend("markup", {})),
    (Prism.languages.ssml = Prism.languages.xml),
    (Prism.languages.atom = Prism.languages.xml),
    (Prism.languages.rss = Prism.languages.xml);
!(function (s) {
    var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    (s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
            pattern: RegExp("@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" + e.source + ")*?(?:;|(?=\\s*\\{))"),
            inside: { rule: /^@[\w-]+/, "selector-function-argument": { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: !0, alias: "selector" }, keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 } },
        },
        url: { pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"), greedy: !0, inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp("^" + e.source + "$"), alias: "url" } } },
        selector: { pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"), lookbehind: !0 },
        string: { pattern: e, greedy: !0 },
        property: { pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: !0 },
        important: /!important\b/i,
        function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
        punctuation: /[(){};:,]/,
    }),
        (s.languages.css.atrule.inside.rest = s.languages.css);
    var t = s.languages.markup;
    t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
})(Prism);
Prism.languages.clike = {
    comment: [
        { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    "class-name": { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } },
    keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: !0 }],
    keyword: [
        { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
        {
            pattern:
                /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0,
        },
    ],
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: { pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"), lookbehind: !0 },
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
    (Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern: RegExp(
                "((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"
            ),
            lookbehind: !0,
            greedy: !0,
            inside: { "regex-source": { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: !0, alias: "language-regex", inside: Prism.languages.regex }, "regex-delimiter": /^\/|\/$/, "regex-flags": /^[a-z]+$/ },
        },
        "function-variable": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/, alias: "function" },
        parameter: [
            { pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/, lookbehind: !0, inside: Prism.languages.javascript },
            { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, lookbehind: !0, inside: Prism.languages.javascript },
            { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript },
            {
                pattern:
                    /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    }),
    Prism.languages.insertBefore("javascript", "string", {
        hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
        "template-string": {
            pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": { pattern: /^`|`$/, alias: "string" },
                interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/, lookbehind: !0, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism.languages.javascript } },
                string: /[\s\S]+/,
            },
        },
        "string-property": { pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m, lookbehind: !0, greedy: !0, alias: "property" },
    }),
    Prism.languages.insertBefore("javascript", "operator", { "literal-property": { pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m, lookbehind: !0, alias: "property" } }),
    Prism.languages.markup &&
        (Prism.languages.markup.tag.addInlined("script", "javascript"),
        Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")),
    (Prism.languages.js = Prism.languages.javascript);
!(function (e) {
    var a,
        n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    (e.languages.css.selector = {
        pattern: e.languages.css.selector.pattern,
        lookbehind: !0,
        inside: (a = {
            "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
            "pseudo-class": /:[-\w]+/,
            class: /\.[-\w]+/,
            id: /#[-\w]+/,
            attribute: {
                pattern: RegExp("\\[(?:[^[\\]\"']|" + n.source + ")*\\]"),
                greedy: !0,
                inside: {
                    punctuation: /^\[|\]$/,
                    "case-sensitivity": { pattern: /(\s)[si]$/i, lookbehind: !0, alias: "keyword" },
                    namespace: { pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/, lookbehind: !0, inside: { punctuation: /\|$/ } },
                    "attr-name": { pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/, lookbehind: !0 },
                    "attr-value": [n, { pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/, lookbehind: !0 }],
                    operator: /[|~*^$]?=/,
                },
            },
            "n-th": [
                { pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/, lookbehind: !0, inside: { number: /[\dn]+/, operator: /[+-]/ } },
                { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
            ],
            combinator: />|\+|~|\|\|/,
            punctuation: /[(),]/,
        }),
    }),
        (e.languages.css.atrule.inside["selector-function-argument"].inside = a),
        e.languages.insertBefore("css", "property", { variable: { pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i, lookbehind: !0 } });
    var r = { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: !0 },
        i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
    e.languages.insertBefore("css", "function", {
        operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
        hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: "color" },
        color: [
            {
                pattern:
                    /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
                lookbehind: !0,
            },
            { pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i, inside: { unit: r, number: i, function: /[\w-]+(?=\()/, punctuation: /[(),]/ } },
        ],
        entity: /\\[\da-f]{1,8}/i,
        unit: r,
        number: i,
    });
})(Prism);
!(function (e) {
    function n(e, n) {
        return "___" + e.toUpperCase() + n + "___";
    }
    Object.defineProperties((e.languages["markup-templating"] = {}), {
        buildPlaceholders: {
            value: function (t, a, r, o) {
                if (t.language === a) {
                    var c = (t.tokenStack = []);
                    (t.code = t.code.replace(r, function (e) {
                        if ("function" == typeof o && !o(e)) return e;
                        for (var r, i = c.length; -1 !== t.code.indexOf((r = n(a, i))); ) ++i;
                        return (c[i] = e), r;
                    })),
                        (t.grammar = e.languages.markup);
                }
            },
        },
        tokenizePlaceholders: {
            value: function (t, a) {
                if (t.language === a && t.tokenStack) {
                    t.grammar = e.languages[a];
                    var r = 0,
                        o = Object.keys(t.tokenStack);
                    !(function c(i) {
                        for (var u = 0; u < i.length && !(r >= o.length); u++) {
                            var g = i[u];
                            if ("string" == typeof g || (g.content && "string" == typeof g.content)) {
                                var l = o[r],
                                    s = t.tokenStack[l],
                                    f = "string" == typeof g ? g : g.content,
                                    p = n(a, l),
                                    k = f.indexOf(p);
                                if (k > -1) {
                                    ++r;
                                    var m = f.substring(0, k),
                                        d = new e.Token(a, e.tokenize(s, t.grammar), "language-" + a, s),
                                        h = f.substring(k + p.length),
                                        v = [];
                                    m && v.push.apply(v, c([m])), v.push(d), h && v.push.apply(v, c([h])), "string" == typeof g ? i.splice.apply(i, [u, 1].concat(v)) : (g.content = v);
                                }
                            } else g.content && c(g.content);
                        }
                        return i;
                    })(t.tokens);
                }
            },
        },
    });
})(Prism);
!(function (e) {
    var a = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
        t = [{ pattern: /\b(?:false|true)\b/i, alias: "boolean" }, { pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i, greedy: !0, lookbehind: !0 }, { pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i, greedy: !0, lookbehind: !0 }, /\b(?:null)\b/i, /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/],
        i = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        n = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
        s = /[{}\[\](),:;]/;
    e.languages.php = {
        delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: "important" },
        comment: a,
        variable: /\$+(?:\w+\b|(?=\{))/,
        package: { pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i, lookbehind: !0, inside: { punctuation: /\\/ } },
        "class-name-definition": { pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i, lookbehind: !0, alias: "class-name" },
        "function-definition": { pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i, lookbehind: !0, alias: "function" },
        keyword: [
            { pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i, alias: "type-casting", greedy: !0, lookbehind: !0 },
            { pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i, alias: "type-hint", greedy: !0, lookbehind: !0 },
            { pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i, alias: "return-type", greedy: !0, lookbehind: !0 },
            { pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i, alias: "type-declaration", greedy: !0 },
            { pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i, alias: "type-declaration", greedy: !0, lookbehind: !0 },
            { pattern: /\b(?:parent|self|static)(?=\s*::)/i, alias: "static-context", greedy: !0 },
            { pattern: /(\byield\s+)from\b/i, lookbehind: !0 },
            /\bclass\b/i,
            {
                pattern:
                    /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
                lookbehind: !0,
            },
        ],
        "argument-name": { pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i, lookbehind: !0 },
        "class-name": [
            { pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 },
            { pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 },
            { pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 },
            { pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i, alias: "class-name-fully-qualified", greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } },
            { pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i, alias: "class-name-fully-qualified", greedy: !0, inside: { punctuation: /\\/ } },
            { pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i, alias: "class-name-fully-qualified", greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } },
            { pattern: /\b[a-z_]\w*(?=\s*\$)/i, alias: "type-declaration", greedy: !0 },
            { pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i, alias: ["class-name-fully-qualified", "type-declaration"], greedy: !0, inside: { punctuation: /\\/ } },
            { pattern: /\b[a-z_]\w*(?=\s*::)/i, alias: "static-context", greedy: !0 },
            { pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i, alias: ["class-name-fully-qualified", "static-context"], greedy: !0, inside: { punctuation: /\\/ } },
            { pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i, alias: "type-hint", greedy: !0, lookbehind: !0 },
            { pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i, alias: ["class-name-fully-qualified", "type-hint"], greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } },
            { pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i, alias: "return-type", greedy: !0, lookbehind: !0 },
            { pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i, alias: ["class-name-fully-qualified", "return-type"], greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } },
        ],
        constant: t,
        function: { pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i, lookbehind: !0, inside: { punctuation: /\\/ } },
        property: { pattern: /(->\s*)\w+/, lookbehind: !0 },
        number: i,
        operator: n,
        punctuation: s,
    };
    var l = { pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/, lookbehind: !0, inside: e.languages.php },
        r = [
            { pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/, alias: "nowdoc-string", greedy: !0, inside: { delimiter: { pattern: /^<<<'[^']+'|[a-z_]\w*;$/i, alias: "symbol", inside: { punctuation: /^<<<'?|[';]$/ } } } },
            { pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i, alias: "heredoc-string", greedy: !0, inside: { delimiter: { pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i, alias: "symbol", inside: { punctuation: /^<<<"?|[";]$/ } }, interpolation: l } },
            { pattern: /`(?:\\[\s\S]|[^\\`])*`/, alias: "backtick-quoted-string", greedy: !0 },
            { pattern: /'(?:\\[\s\S]|[^\\'])*'/, alias: "single-quoted-string", greedy: !0 },
            { pattern: /"(?:\\[\s\S]|[^\\"])*"/, alias: "double-quoted-string", greedy: !0, inside: { interpolation: l } },
        ];
    e.languages.insertBefore("php", "variable", {
        string: r,
        attribute: {
            pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
            greedy: !0,
            inside: {
                "attribute-content": {
                    pattern: /^(#\[)[\s\S]+(?=\]$)/,
                    lookbehind: !0,
                    inside: {
                        comment: a,
                        string: r,
                        "attribute-class-name": [
                            { pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i, alias: "class-name", greedy: !0, lookbehind: !0 },
                            { pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i, alias: ["class-name", "class-name-fully-qualified"], greedy: !0, lookbehind: !0, inside: { punctuation: /\\/ } },
                        ],
                        constant: t,
                        number: i,
                        operator: n,
                        punctuation: s,
                    },
                },
                delimiter: { pattern: /^#\[|\]$/, alias: "punctuation" },
            },
        },
    }),
        e.hooks.add("before-tokenize", function (a) {
            /<\?/.test(a.code) && e.languages["markup-templating"].buildPlaceholders(a, "php", /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g);
        }),
        e.hooks.add("after-tokenize", function (a) {
            e.languages["markup-templating"].tokenizePlaceholders(a, "php");
        });
})(Prism);
!(function (a) {
    var e = (a.languages.javadoclike = { parameter: { pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m, lookbehind: !0 }, keyword: { pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m, lookbehind: !0 }, punctuation: /[{}]/ });
    Object.defineProperty(e, "addSupport", {
        value: function (e, n) {
            "string" == typeof e && (e = [e]),
                e.forEach(function (e) {
                    !(function (e, n) {
                        var t = "doc-comment",
                            r = a.languages[e];
                        if (r) {
                            var o = r[t];
                            if ((o || (o = (r = a.languages.insertBefore(e, "comment", { "doc-comment": { pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/, lookbehind: !0, alias: "comment" } }))[t]), o instanceof RegExp && (o = r[t] = { pattern: o }), Array.isArray(o)))
                                for (var i = 0, s = o.length; i < s; i++) o[i] instanceof RegExp && (o[i] = { pattern: o[i] }), n(o[i]);
                            else n(o);
                        }
                    })(e, function (a) {
                        a.inside || (a.inside = {}), (a.inside.rest = n);
                    });
                });
        },
    }),
        e.addSupport(["java", "javascript", "php"], e);
})(Prism);
!(function (e) {
    (e.languages.typescript = e.languages.extend("javascript", {
        "class-name": { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/, lookbehind: !0, greedy: !0, inside: null },
        builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
    })),
        e.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/, /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/, /\btype\b(?=\s*(?:[\{*]|$))/),
        delete e.languages.typescript.parameter,
        delete e.languages.typescript["literal-property"];
    var s = e.languages.extend("typescript", {});
    delete s["class-name"],
        (e.languages.typescript["class-name"].inside = s),
        e.languages.insertBefore("typescript", "function", {
            decorator: { pattern: /@[$\w\xA0-\uFFFF]+/, inside: { at: { pattern: /^@/, alias: "operator" }, function: /^[\s\S]+/ } },
            "generic-function": {
                pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
                greedy: !0,
                inside: { function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/, generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: s } },
            },
        }),
        (e.languages.ts = e.languages.typescript);
})(Prism);
!(function (e) {
    var a = e.languages.javascript,
        n = "\\{(?:[^{}]|\\{(?:[^{}]|\\{[^{}]*\\})*\\})+\\}",
        t = "(@(?:arg|argument|param|property)\\s+(?:" + n + "\\s+)?)";
    (e.languages.jsdoc = e.languages.extend("javadoclike", { parameter: { pattern: RegExp(t + "(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?=\\s|$)"), lookbehind: !0, inside: { punctuation: /\./ } } })),
        e.languages.insertBefore("jsdoc", "keyword", {
            "optional-parameter": {
                pattern: RegExp(t + "\\[(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?:=[^[\\]]+)?\\](?=\\s|$)"),
                lookbehind: !0,
                inside: { parameter: { pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/, lookbehind: !0, inside: { punctuation: /\./ } }, code: { pattern: /(=)[\s\S]*(?=\]$)/, lookbehind: !0, inside: a, alias: "language-javascript" }, punctuation: /[=[\]]/ },
            },
            "class-name": [
                {
                    pattern: RegExp(
                        "(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\\s+(?:<TYPE>\\s+)?)[A-Z]\\w*(?:\\.[A-Z]\\w*)*".replace(/<TYPE>/g, function () {
                            return n;
                        })
                    ),
                    lookbehind: !0,
                    inside: { punctuation: /\./ },
                },
                { pattern: RegExp("(@[a-z]+\\s+)" + n), lookbehind: !0, inside: { string: a.string, number: a.number, boolean: a.boolean, keyword: e.languages.typescript.keyword, operator: /=>|\.\.\.|[&|?:*]/, punctuation: /[.,;=<>{}()[\]]/ } },
            ],
            example: { pattern: /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/, lookbehind: !0, inside: { code: { pattern: /^([\t ]*(?:\*\s*)?)\S.*$/m, lookbehind: !0, inside: a, alias: "language-javascript" } } },
        }),
        e.languages.javadoclike.addSupport("javascript", e.languages.jsdoc);
})(Prism);
!(function (a) {
    function e(a, e) {
        return RegExp(
            a.replace(/<ID>/g, function () {
                return "(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*";
            }),
            e
        );
    }
    a.languages.insertBefore("javascript", "function-variable", { "method-variable": { pattern: RegExp("(\\.\\s*)" + a.languages.javascript["function-variable"].pattern.source), lookbehind: !0, alias: ["function-variable", "method", "function", "property-access"] } }),
        a.languages.insertBefore("javascript", "function", { method: { pattern: RegExp("(\\.\\s*)" + a.languages.javascript.function.source), lookbehind: !0, alias: ["function", "property-access"] } }),
        a.languages.insertBefore("javascript", "constant", {
            "known-class-name": [
                { pattern: /\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/, alias: "class-name" },
                { pattern: /\b(?:[A-Z]\w*)Error\b/, alias: "class-name" },
            ],
        }),
        a.languages.insertBefore("javascript", "keyword", {
            imports: { pattern: e("(\\bimport\\b\\s*)(?:<ID>(?:\\s*,\\s*(?:\\*\\s*as\\s+<ID>|\\{[^{}]*\\}))?|\\*\\s*as\\s+<ID>|\\{[^{}]*\\})(?=\\s*\\bfrom\\b)"), lookbehind: !0, inside: a.languages.javascript },
            exports: { pattern: e("(\\bexport\\b\\s*)(?:\\*(?:\\s*as\\s+<ID>)?(?=\\s*\\bfrom\\b)|\\{[^{}]*\\})"), lookbehind: !0, inside: a.languages.javascript },
        }),
        a.languages.javascript.keyword.unshift(
            { pattern: /\b(?:as|default|export|from|import)\b/, alias: "module" },
            { pattern: /\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/, alias: "control-flow" },
            { pattern: /\bnull\b/, alias: ["null", "nil"] },
            { pattern: /\bundefined\b/, alias: "nil" }
        ),
        a.languages.insertBefore("javascript", "operator", { spread: { pattern: /\.{3}/, alias: "operator" }, arrow: { pattern: /=>/, alias: "operator" } }),
        a.languages.insertBefore("javascript", "punctuation", {
            "property-access": { pattern: e("(\\.\\s*)#?<ID>"), lookbehind: !0 },
            "maybe-class-name": { pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/, lookbehind: !0 },
            dom: { pattern: /\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/, alias: "variable" },
            console: { pattern: /\bconsole(?=\s*\.)/, alias: "class-name" },
        });
    for (var t = ["function", "function-variable", "method", "method-variable", "property-access"], r = 0; r < t.length; r++) {
        var n = t[r],
            s = a.languages.javascript[n];
        "RegExp" === a.util.type(s) && (s = a.languages.javascript[n] = { pattern: s });
        var o = s.inside || {};
        (s.inside = o), (o["maybe-class-name"] = /^[A-Z][\s\S]*/);
    }
})(Prism);
(Prism.languages.json = {
    property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: !0, greedy: !0 },
    string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: !0, greedy: !0 },
    comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:false|true)\b/,
    null: { pattern: /\bnull\b/, alias: "keyword" },
}),
    (Prism.languages.webmanifest = Prism.languages.json);
!(function (n) {
    function e(n) {
        return (
            (n = n.replace(/<inner>/g, function () {
                return "(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?![\r\n]))";
            })),
            RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + n + ")")
        );
    }
    var t = "(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+",
        a = "\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))".replace(/__/g, function () {
            return t;
        }),
        i = "\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)";
    (n.languages.markdown = n.languages.extend("markup", {})),
        n.languages.insertBefore("markdown", "prolog", {
            "front-matter-block": { pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/, lookbehind: !0, greedy: !0, inside: { punctuation: /^---|---$/, "front-matter": { pattern: /\S+(?:\s+\S+)*/, alias: ["yaml", "language-yaml"], inside: n.languages.yaml } } },
            blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
            table: {
                pattern: RegExp("^" + a + i + "(?:" + a + ")*", "m"),
                inside: {
                    "table-data-rows": { pattern: RegExp("^(" + a + i + ")(?:" + a + ")*$"), lookbehind: !0, inside: { "table-data": { pattern: RegExp(t), inside: n.languages.markdown }, punctuation: /\|/ } },
                    "table-line": { pattern: RegExp("^(" + a + ")" + i + "$"), lookbehind: !0, inside: { punctuation: /\||:?-{3,}:?/ } },
                    "table-header-row": { pattern: RegExp("^" + a + "$"), inside: { "table-header": { pattern: RegExp(t), alias: "important", inside: n.languages.markdown }, punctuation: /\|/ } },
                },
            },
            code: [
                { pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/, lookbehind: !0, alias: "keyword" },
                { pattern: /^```[\s\S]*?^```$/m, greedy: !0, inside: { "code-block": { pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m, lookbehind: !0 }, "code-language": { pattern: /^(```).+/, lookbehind: !0 }, punctuation: /```/ } },
            ],
            title: [
                { pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m, alias: "important", inside: { punctuation: /==+$|--+$/ } },
                { pattern: /(^\s*)#.+/m, lookbehind: !0, alias: "important", inside: { punctuation: /^#+|#+$/ } },
            ],
            hr: { pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: "punctuation" },
            list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: "punctuation" },
            "url-reference": {
                pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
                inside: { variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 }, string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/, punctuation: /^[\[\]!:]|[<>]/ },
                alias: "url",
            },
            bold: { pattern: e("\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*"), lookbehind: !0, greedy: !0, inside: { content: { pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: !0, inside: {} }, punctuation: /\*\*|__/ } },
            italic: { pattern: e("\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*"), lookbehind: !0, greedy: !0, inside: { content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} }, punctuation: /[*_]/ } },
            strike: { pattern: e("(~~?)(?:(?!~)<inner>)+\\2"), lookbehind: !0, greedy: !0, inside: { content: { pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: !0, inside: {} }, punctuation: /~~?/ } },
            "code-snippet": { pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/, lookbehind: !0, greedy: !0, alias: ["code", "keyword"] },
            url: {
                pattern: e('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])'),
                lookbehind: !0,
                greedy: !0,
                inside: {
                    operator: /^!/,
                    content: { pattern: /(^\[)[^\]]+(?=\])/, lookbehind: !0, inside: {} },
                    variable: { pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
                    url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 },
                    string: { pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/, lookbehind: !0 },
                },
            },
        }),
        ["url", "bold", "italic", "strike"].forEach(function (e) {
            ["url", "bold", "italic", "strike", "code-snippet"].forEach(function (t) {
                e !== t && (n.languages.markdown[e].inside.content.inside[t] = n.languages.markdown[t]);
            });
        }),
        n.hooks.add("after-tokenize", function (n) {
            ("markdown" !== n.language && "md" !== n.language) ||
                (function n(e) {
                    if (e && "string" != typeof e)
                        for (var t = 0, a = e.length; t < a; t++) {
                            var i = e[t];
                            if ("code" === i.type) {
                                var r = i.content[1],
                                    o = i.content[3];
                                if (r && o && "code-language" === r.type && "code-block" === o.type && "string" == typeof r.content) {
                                    var l = r.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp"),
                                        s = "language-" + (l = (/[a-z][\w-]*/i.exec(l) || [""])[0].toLowerCase());
                                    o.alias ? ("string" == typeof o.alias ? (o.alias = [o.alias, s]) : o.alias.push(s)) : (o.alias = [s]);
                                }
                            } else n(i.content);
                        }
                })(n.tokens);
        }),
        n.hooks.add("wrap", function (e) {
            if ("code-block" === e.type) {
                for (var t = "", a = 0, i = e.classes.length; a < i; a++) {
                    var s = e.classes[a],
                        d = /language-(.+)/.exec(s);
                    if (d) {
                        t = d[1];
                        break;
                    }
                }
                var p = n.languages[t];
                if (p)
                    e.content = n.highlight(
                        e.content.replace(r, "").replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (n, e) {
                            var t;
                            return "#" === (e = e.toLowerCase())[0] ? ((t = "x" === e[1] ? parseInt(e.slice(2), 16) : Number(e.slice(1))), l(t)) : o[e] || n;
                        }),
                        p,
                        t
                    );
                else if (t && "none" !== t && n.plugins.autoloader) {
                    var u = "md-" + new Date().valueOf() + "-" + Math.floor(1e16 * Math.random());
                    (e.attributes.id = u),
                        n.plugins.autoloader.loadLanguages(t, function () {
                            var e = document.getElementById(u);
                            e && (e.innerHTML = n.highlight(e.textContent, n.languages[t], t));
                        });
                }
            }
        });
    var r = RegExp(n.languages.markup.tag.pattern.source, "gi"),
        o = { amp: "&", lt: "<", gt: ">", quot: '"' },
        l = String.fromCodePoint || String.fromCharCode;
    n.languages.md = n.languages.markdown;
})(Prism);
!(function (a) {
    var e = "(?:\\b[a-zA-Z]\\w*|[|\\\\[\\]])+";
    (a.languages.phpdoc = a.languages.extend("javadoclike", { parameter: { pattern: RegExp("(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:" + e + "\\s+)?)\\$\\w+"), lookbehind: !0 } })),
        a.languages.insertBefore("phpdoc", "keyword", {
            "class-name": [
                {
                    pattern: RegExp("(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)" + e),
                    lookbehind: !0,
                    inside: { keyword: /\b(?:array|bool|boolean|callback|double|false|float|int|integer|mixed|null|object|resource|self|string|true|void)\b/, punctuation: /[|\\[\]()]/ },
                },
            ],
        }),
        a.languages.javadoclike.addSupport("php", a.languages.phpdoc);
})(Prism);
Prism.languages.insertBefore("php", "variable", {
    this: { pattern: /\$this\b/, alias: "keyword" },
    global: /\$(?:GLOBALS|HTTP_RAW_POST_DATA|_(?:COOKIE|ENV|FILES|GET|POST|REQUEST|SERVER|SESSION)|argc|argv|http_response_header|php_errormsg)\b/,
    scope: { pattern: /\b[\w\\]+::/, inside: { keyword: /\b(?:parent|self|static)\b/, punctuation: /::|\\/ } },
});
(Prism.languages.scss = Prism.languages.extend("css", {
    comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
    atrule: { pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/, inside: { rule: /@[\w-]+/ } },
    url: /(?:[-a-z]+-)?url(?=\()/i,
    selector: { pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/, inside: { parent: { pattern: /&/, alias: "important" }, placeholder: /%[-\w]+/, variable: /\$[-\w]+|#\{\$[-\w]+\}/ } },
    property: { pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/, inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ } },
})),
    Prism.languages.insertBefore("scss", "atrule", { keyword: [/@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i, { pattern: /( )(?:from|through)(?= )/, lookbehind: !0 }] }),
    Prism.languages.insertBefore("scss", "important", { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }),
    Prism.languages.insertBefore("scss", "function", {
        "module-modifier": { pattern: /\b(?:as|hide|show|with)\b/i, alias: "keyword" },
        placeholder: { pattern: /%[-\w]+/, alias: "selector" },
        statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
        boolean: /\b(?:false|true)\b/,
        null: { pattern: /\bnull\b/, alias: "keyword" },
        operator: { pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/, lookbehind: !0 },
    }),
    (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss);
Prism.languages.sql = {
    comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: !0 },
    variable: [{ pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 }, /@[\w.$]+/],
    string: { pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/, greedy: !0, lookbehind: !0 },
    identifier: { pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/, greedy: !0, lookbehind: !0, inside: { punctuation: /^`|`$/ } },
    function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword:
        /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/,
};
!(function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
        var e = "line-numbers",
            n = /\n(?!$)/g,
            t = (Prism.plugins.lineNumbers = {
                getLine: function (n, t) {
                    if ("PRE" === n.tagName && n.classList.contains(e)) {
                        var i = n.querySelector(".line-numbers-rows");
                        if (i) {
                            var r = parseInt(n.getAttribute("data-start"), 10) || 1,
                                s = r + (i.children.length - 1);
                            t < r && (t = r), t > s && (t = s);
                            var l = t - r;
                            return i.children[l];
                        }
                    }
                },
                resize: function (e) {
                    r([e]);
                },
                assumeViewportIndependence: !0,
            }),
            i = void 0;
        window.addEventListener("resize", function () {
            (t.assumeViewportIndependence && i === window.innerWidth) || ((i = window.innerWidth), r(Array.prototype.slice.call(document.querySelectorAll("pre.line-numbers"))));
        }),
            Prism.hooks.add("complete", function (t) {
                if (t.code) {
                    var i = t.element,
                        s = i.parentNode;
                    if (s && /pre/i.test(s.nodeName) && !i.querySelector(".line-numbers-rows") && Prism.util.isActive(i, e)) {
                        i.classList.remove(e), s.classList.add(e);
                        var l,
                            o = t.code.match(n),
                            a = o ? o.length + 1 : 1,
                            u = new Array(a + 1).join("<span></span>");
                        (l = document.createElement("span")).setAttribute("aria-hidden", "true"),
                            (l.className = "line-numbers-rows"),
                            (l.innerHTML = u),
                            s.hasAttribute("data-start") && (s.style.counterReset = "linenumber " + (parseInt(s.getAttribute("data-start"), 10) - 1)),
                            t.element.appendChild(l),
                            r([s]),
                            Prism.hooks.run("line-numbers", t);
                    }
                }
            }),
            Prism.hooks.add("line-numbers", function (e) {
                (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
            });
    }
    function r(e) {
        if (
            0 !=
            (e = e.filter(function (e) {
                var n,
                    t = ((n = e), n ? (window.getComputedStyle ? getComputedStyle(n) : n.currentStyle || null) : null)["white-space"];
                return "pre-wrap" === t || "pre-line" === t;
            })).length
        ) {
            var t = e
                .map(function (e) {
                    var t = e.querySelector("code"),
                        i = e.querySelector(".line-numbers-rows");
                    if (t && i) {
                        var r = e.querySelector(".line-numbers-sizer"),
                            s = t.textContent.split(n);
                        r || (((r = document.createElement("span")).className = "line-numbers-sizer"), t.appendChild(r)), (r.innerHTML = "0"), (r.style.display = "block");
                        var l = r.getBoundingClientRect().height;
                        return (r.innerHTML = ""), { element: e, lines: s, lineHeights: [], oneLinerHeight: l, sizer: r };
                    }
                })
                .filter(Boolean);
            t.forEach(function (e) {
                var n = e.sizer,
                    t = e.lines,
                    i = e.lineHeights,
                    r = e.oneLinerHeight;
                (i[t.length - 1] = void 0),
                    t.forEach(function (e, t) {
                        if (e && e.length > 1) {
                            var s = n.appendChild(document.createElement("span"));
                            (s.style.display = "block"), (s.textContent = e);
                        } else i[t] = r;
                    });
            }),
                t.forEach(function (e) {
                    for (var n = e.sizer, t = e.lineHeights, i = 0, r = 0; r < t.length; r++) void 0 === t[r] && (t[r] = n.children[i++].getBoundingClientRect().height);
                }),
                t.forEach(function (e) {
                    var n = e.sizer,
                        t = e.element.querySelector(".line-numbers-rows");
                    (n.style.display = "none"),
                        (n.innerHTML = ""),
                        e.lineHeights.forEach(function (e, n) {
                            t.children[n].style.height = e + "px";
                        });
                });
        }
    }
})();
!(function () {
    if ("undefined" != typeof Prism) {
        var r = { tab: /\t/, crlf: /\r\n/, lf: /\n/, cr: /\r/, space: / / };
        Prism.hooks.add("before-highlight", function (r) {
            i(r.grammar);
        });
    }
    function e(r, a) {
        var n = r[a];
        switch (Prism.util.type(n)) {
            case "RegExp":
                var t = {};
                (r[a] = { pattern: n, inside: t }), i(t);
                break;
            case "Array":
                for (var f = 0, s = n.length; f < s; f++) e(n, f);
                break;
            default:
                i((t = n.inside || (n.inside = {})));
        }
    }
    function i(a) {
        if (a && !a.tab) {
            for (var n in r) r.hasOwnProperty(n) && (a[n] = r[n]);
            for (var n in a) a.hasOwnProperty(n) && !r[n] && ("rest" === n ? i(a.rest) : e(a, n));
        }
    }
})();
!(function () {
    if ("undefined" != typeof Prism) {
        var i = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&!$'()*,;@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/,
            n = /\b\S+@[\w.]+[a-z]{2}/,
            t = /\[([^\]]+)\]\(([^)]+)\)/,
            e = ["comment", "url", "attr-value", "string"];
        (Prism.plugins.autolinker = {
            processGrammar: function (r) {
                r &&
                    !r["url-link"] &&
                    (Prism.languages.DFS(r, function (r, a, l) {
                        e.indexOf(l) > -1 &&
                            !Array.isArray(a) &&
                            (a.pattern || (a = this[r] = { pattern: a }),
                            (a.inside = a.inside || {}),
                            "comment" == l && (a.inside["md-link"] = t),
                            "attr-value" == l ? Prism.languages.insertBefore("inside", "punctuation", { "url-link": i }, a) : (a.inside["url-link"] = i),
                            (a.inside["email-link"] = n));
                    }),
                    (r["url-link"] = i),
                    (r["email-link"] = n));
            },
        }),
            Prism.hooks.add("before-highlight", function (i) {
                Prism.plugins.autolinker.processGrammar(i.grammar);
            }),
            Prism.hooks.add("wrap", function (i) {
                if (/-link$/.test(i.type)) {
                    i.tag = "a";
                    var n = i.content;
                    if ("email-link" == i.type && 0 != n.indexOf("mailto:")) n = "mailto:" + n;
                    else if ("md-link" == i.type) {
                        var e = i.content.match(t);
                        (n = e[2]), (i.content = e[1]);
                    }
                    i.attributes.href = n;
                    try {
                        i.content = decodeURIComponent(i.content);
                    } catch (i) {}
                }
            });
    }
})();
!(function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
        Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
        var t = { js: "javascript", py: "python", rb: "ruby", ps1: "powershell", psm1: "powershell", sh: "bash", bat: "batch", h: "c", tex: "latex" },
            e = "data-src-status",
            i = 'pre[data-src]:not([data-src-status="loaded"]):not([data-src-status="loading"])';
        Prism.hooks.add("before-highlightall", function (t) {
            t.selector += ", " + i;
        }),
            Prism.hooks.add("before-sanity-check", function (a) {
                var n = a.element;
                if (n.matches(i)) {
                    (a.code = ""), n.setAttribute(e, "loading");
                    var s = n.appendChild(document.createElement("CODE"));
                    s.textContent = "Loading…";
                    var r = n.getAttribute("data-src"),
                        l = a.language;
                    if ("none" === l) {
                        var o = (/\.(\w+)$/.exec(r) || [, "none"])[1];
                        l = t[o] || o;
                    }
                    Prism.util.setLanguage(s, l), Prism.util.setLanguage(n, l);
                    var h = Prism.plugins.autoloader;
                    h && h.loadLanguages(l),
                        (function (t, i, a) {
                            var r = new XMLHttpRequest();
                            r.open("GET", t, !0),
                                (r.onreadystatechange = function () {
                                    4 == r.readyState &&
                                        (r.status < 400 && r.responseText
                                            ? (function (t) {
                                                  n.setAttribute(e, "loaded");
                                                  var i = (function (t) {
                                                      var e = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(t || "");
                                                      if (e) {
                                                          var i = Number(e[1]),
                                                              a = e[2],
                                                              n = e[3];
                                                          return a ? (n ? [i, Number(n)] : [i, void 0]) : [i, i];
                                                      }
                                                  })(n.getAttribute("data-range"));
                                                  if (i) {
                                                      var a = t.split(/\r\n?|\n/g),
                                                          r = i[0],
                                                          l = null == i[1] ? a.length : i[1];
                                                      r < 0 && (r += a.length),
                                                          (r = Math.max(0, Math.min(r - 1, a.length))),
                                                          l < 0 && (l += a.length),
                                                          (l = Math.max(0, Math.min(l, a.length))),
                                                          (t = a.slice(r, l).join("\n")),
                                                          n.hasAttribute("data-start") || n.setAttribute("data-start", String(r + 1));
                                                  }
                                                  (s.textContent = t), Prism.highlightElement(s);
                                              })(r.responseText)
                                            : r.status >= 400
                                            ? a("✖ Error " + r.status + " while fetching file: " + r.statusText)
                                            : a("✖ Error: File does not exist or is empty"));
                                }),
                                r.send(null);
                        })(r, 0, function (t) {
                            n.setAttribute(e, "failed"), (s.textContent = t);
                        });
                }
            }),
            (Prism.plugins.fileHighlight = {
                highlight: function (t) {
                    for (var e, a = (t || document).querySelectorAll(i), n = 0; (e = a[n++]); ) Prism.highlightElement(e);
                },
            });
        var a = !1;
        Prism.fileHighlight = function () {
            a || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), (a = !0)), Prism.plugins.fileHighlight.highlight.apply(this, arguments);
        };
    }
})();

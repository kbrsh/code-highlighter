var app = new Moon({
  el: '#app',
  data: {
    code: $("textarea").value,
    lang: "JS"
  },
  methods: {
    compile: function() {
      var val = compile(document.getElementById("i").value, app.get("lang"));
      app.set("code", val);
    }
  }
});

var compile = function(val, lang) {
  var compiled = val;
  lang = lang.toUpperCase();

  if(lang === "HTML") {
    compiled.replace(/<(.*?)>/g, function(match, p1) {
      escapedMatch = match.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      compiled = compiled.replace(match, '<span class="tag">' + escapedMatch + '</span>');
    });
  }
  compiled.replace(/(['])(.)*?\1/g, function(match, p1) {
    compiled = compiled.replace(match, '<span class="string">' + match + '</span>');
  });
  if(lang === "JS") {
    compiled.replace(/(new|for|function|var|return)/g, function(match, p1) {
      compiled = compiled.replace(match, '<span class="special">' + match + '</span>');
    });
    compiled.replace(/\s(true|false|[0-9]+)\s/g, function(match, p1) {
      compiled = compiled.replace(match, '<span class="user-special">' + match + '</span>');
    });
  }
  return compiled;
}

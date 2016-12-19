var app = new Moon({
  el: '#app',
  data: {
    code: $("textarea").value,
    lang: "JS"
  },
  methods: {
    compile: function() {
      var val = compile(document.getElementById("i").value);
      app.set("code", val);
    }
  }
});

var compile = function(val, lang) {
  var compiled = val;
  lang = lang.toUpperCase();
  compiled.replace(/<(.*?)>/g, function(match, p1) {
    escapedMatch = match.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    compiled = compiled.replace(match, '<span class="tag">' + escapedMatch + '</span>');
  });

  compiled.replace(/(['])(.)*?\1/g, function(match, p1) {
    compiled = compiled.replace(match, '<span class="string">' + match + '</span>');
  });
  compiled.replace(/(new|for|function|var)/g, function(match, p1) {
    compiled = compiled.replace(match, '<span class="special">' + match + '</span>');
  });
  return compiled;
}

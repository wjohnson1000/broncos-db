$(function () {
  // Grab the template script
  var theTemplateScript = $("#roster-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context={
    name: 'John'
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.roster').html(theCompiledHtml);
});


/***********************************************************************************************************************
        Application Core - by Amazing Web Solutions.  Email: amazingwebsolutionsgh@gmail.com
***********************************************************************************************************************/

var App = {};

$(function() {

    $.getJSON("uploads/data.json", function(data) { 

        /* Insert templates data
        ****************************************************************************/
       // $("#header .section2 div:first").append( $("<p />", {"html":data.info.intro}) );
        //$(".info-section div:first").append( $("<p />", {"html":data.info.about}) );
        //$(".info-section div:last").append( $("<p />", {"html":data.info.contact}) );
        $("#footer .copyright-section span.year").text(data.info.year);


        /*Services & Projects
        ****************************************************************************/
        var servicesGroup = $("<div />", {"class":"services-group"});
        var projectsGroup = $("<div />", {"class":"projects-group"});
         

        for (var i in data.services) {
            var ser = $("<div />", {"class":"service"}).data("query", data.services[i]);

            var fig = $("<figure />").append( $("<img />", {"src":"uploads/"+ data.services[i].photo, "alt":data.services[i].title}) );
            var cap = $("<figcaption />").append( $("<h5 />", {"html":data.services[i].title}) );
            cap.append( $("<a />", {"html":"Read More &raquo;", "href":"#"}) );

            ser.append( fig.append( cap ) );
            servicesGroup.append( ser );
        }

        for (var i in data.projects) {
            var pro = $("<div />", {"class":"project"}).data("query", data.projects[i]);

            var fig = $("<figure />").append( $("<img />", {"src":"uploads/"+ data.projects[i].photo, "alt":data.projects[i].title}) );
            var cap = $("<figcaption />").append( $("<h5 />", {"html":data.projects[i].title}) );
            cap.append( $("<a />", {"html":"Read More &raquo;", "href":"#"}) );

            pro.append( fig.append( cap ) );
            projectsGroup.append( pro );
        }

        $(".services-section").append( servicesGroup );
        $(".projects-section").append( projectsGroup );

         

        /* Bind Events
        *****************************************************************************/
        $(".services-group .service").on("click", function(e) {
            e.preventDefault();

            var serviceData =  $(this).data("query");
            //alert(serviceData);
           
            App.showLightbox(function(container) {
                var t = $("<h4 />", {"html":serviceData.title});
                var fig = $("<figure />").append( $("<img />", {"src":"uploads/"+ serviceData.photo, "alt":serviceData.title}) );
                var p = $("<div />", {"html":serviceData.description});

                container.append( t ).append( fig ).append( p );
            });
        });

    });
});

App.debug = true;

App.log = function(msg) {
	if (App.debug) console.log(msg);
};

/***********************************************************************************************************************
        LIGHTBOX
***********************************************************************************************************************/
App.removeLightbox = function(callback) {
	$("#lightbox").fadeOut("slow").replaceWith(" ");
	if (callback != null) callback();
};

App.showLightbox = function(callback) {
	App.removeLightbox();
    
    var close = $("<p />", {"class":"close", "text":"x"}).bind("click", function(e) {
    	e.preventDefault();
    	App.removeLightbox();
    });

    var container = $("<div />", {"class":"container"}).append(close);
	var lightbox  = $("<div />", {"id":"lightbox", "class": "lightbox"}).append(container);
	$("body").append(lightbox);
	lightbox.hide().fadeIn("slow");

    lightbox.css({
        height: $(document).height() + "px"
    });

	if (callback != null) callback(container);
};


/* Data Manipulation
****************************************************************************/
App.displayItem = function(container, query) {
    var fig = $("<figure />").append("<img />", {"src":"uploads/"+ query.image, "alt":data.title + " image"}).append( $("<ficaption />", {"text":query.caption}) );
    container.append( fig ) .append( $("<p />", {"html": query.description}) );
}
'use strict';

$(document).ready(function(){

    $('#tyc').change(function(e){
        $('#offer').removeClass('hide');
    });

    $('#collapseoffer').click(function(e){
        e.preventDefault();
        $('#offer').addClass('hide');
    });

    $.noty.defaults = {
        layout: 'bottomRight',
        theme: 'relax', // or 'relax'
        type: 'alert',
        text: '', // can be html or string
        dismissQueue: true, // If you want to use queue feature set this true
        template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
        animation: {
            open: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceInLeft'
            close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
            easing: 'swing',
            speed: 500 // opening & closing animation speed
        },
        timeout: false, // delay for closing event. Set false for sticky notifications
        force: false, // adds notification to the beginning of queue when set to true
        modal: false,
        maxVisible: 5, // you can set max visible notification for dismissQueue true option,
        killer: false, // for close all notifications before show
        closeWith: ['button'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
        callback: {
            onShow: function() {},
            afterShow: function() {},
            onClose: function() {},
            afterClose: function() {},
            onCloseClick: function() {},
        },
        buttons: false // an array of buttons
    };
});

;(function($){
            
    gamify = window.gamify = {
        log: function(a){try{console.log(a);} catch(e) {}},
        host: document.location.origin+'/service/',
        getRandom: function(bottom, top) {
            return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;                
        },
        logAction: function(name, tag, cb){
            $.ajax({
                type: 'GET',
                url: gamify.host+'logaction/'+name+'/'+tag,
                //data: {name:name, tag:tag},
                dataType: "json",
                success: function(data){
                    gamify.log(data);
                    if(typeof cb == 'function')
                        cb(data);
                },
                failure: function(data){
                    gamify.log(data);
                }
            });
        },
        getPoints: function(cb){
            $.ajax({
                type: 'GET',
                url: gamify.host+'getpoints/',
                //data: {name:name, tag:tag},
                dataType: "json",
                success: function(data){
                    gamify.log(data);
                    if(typeof cb == 'function')
                        cb(data);
                },
                failure: function(data){
                    gamify.log(data);
                }
            });
        },
        refreshPoints: function(){
            gamify.getPoints(function(data){
                if(typeof data.puntos != "undefined"){
                    $('.cant-puntos').html(data.puntos);
                }
            });
        },
        markNotificationAsRead: function(id, cb){
            $.ajax({
                type: 'GET',
                url: gamify.host+'marknotificationsasread/id/'+id,
                dataType: "json",
                success: function(data){
                    gamify.log(data);
                    if(typeof cb == 'function')
                        cb(data);
                },
                failure: function(data){
                    gamify.log(data);
                }
            });
        },
        getPendingNotifications : function(cb){
            $.ajax({
                type: 'GET',
                url: gamify.host+'getpendingnotifications',
                dataType: "json",
                success: function(data){
                    gamify.log(data);
                    if(typeof cb == 'function')
                        cb(data);
                },
                failure: function(data){
                    gamify.log(data);
                }
            });
        },
        showPendingNotifications : function(){
            gamify.getPendingNotifications(function(data){
                if(data.status == 'ok'){
                    $.each(data.messages, function(i,v){
                        if($('div[data-notification='+v['_id']+']').size()==0){
                            var text = '<h6><strong>'+v.title+'</strong></h6>';
                            text += '<p><i class="notyicon '+v.icon+'"></i>'+v.message+'</p>';
                            text += '<div class="hide" data-notification="'+v['_id']+'"></div>';
                            noty({ text: text });
                        }
                        //console.log(v);    
                        /*
                        if($('a[data-notification='+v.idNotifications+']').size()==0){
                            $container.notify("create", "withIcon", { 
                                idNotification:v.idNotifications, 
                                title:v.title, 
                                text:v.message, 
                                icon:v.icon
                                }, { expires:false });
                        }
                        */
                    });    
                }
            });
        },
        getCompletedChallenges : function(cb){
            $.ajax({
                type: 'GET',
                url: gamify.host+'getcompletedchallenges',
                dataType: "json",
                success: function(data){
                    gamify.log(data);
                    if(typeof cb == 'function')
                        cb(data);
                },
                failure: function(data){
                    gamify.log(data);
                }
            });
        }
    };

})(jQuery);

// Execute on ready
$(document).ready(function(){
    // Show notifications on page load
    gamify.showPendingNotifications();
    // Visit page action
    gamify.logAction('visit', $('#site-page').text()||'unknownsection', function(){
        gamify.showPendingNotifications();
    });
    // Detect if user scroll to the bottom
    var scrolledDown = false;
    $(window).scroll(function() {
       if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
           console.log("near bottom!");
           if(!scrolledDown){
              gamify.logAction('scroll', $('#site-page').text()||'unknownsection', function(){
                scrolledDown = true;
                gamify.showPendingNotifications();
              });
           }
       }
    });
});

/**
 * @ngdoc directive
 * @name anyandgoApp.directive:readterms
 * @description
 * # readterms
 */
angular.module('anyandgoApp')
  .directive('readterms', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        //$(element).metisMenu(scope.$eval(attrs.toolbarTip));
      }
    };
  });


//find all the image in answer feed,thumbnail and ad feeds and add blurclasses



var interval; 
var restart_timeout

var blurImage = function(){
    clearInterval(interval)
    random_image_timed()

}


function random_image() {
    const overlay_styles = ` position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba( 0, 0, 0, 0 );
    z-index: 10000;`


    const x = Math.floor((Math.random() * 1000));
    const y = Math.floor((Math.random() * 1000));

    const random_time = 750

    setTimeout( () => {

        console.log(x, y)

        $("#overlay").remove()

        const image_styles = `width: 300px; margin: 0 auto; display: flex; margin-top: ${y}px; margin-left: ${x}px;`
    
        const overlay = $(`<div id="overlay" style="${overlay_styles}" ></div>`)
        overlay.appendTo(document.body)

        const random_string = Math.random().toString(36).slice(-8);

    
        $("#overlay").append(`<img src='https://source.unsplash.com/1600x900/?id=${random_string}' style="${image_styles}"></img> `)
        
        blurImage()
        
    }, random_time)
}

function random_image_timed() {
    const overlay_styles = ` position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba( 0, 0, 0, 0 );
    z-index: 10000;`




    const x = Math.floor((Math.random() * 1000));
    const y = Math.floor((Math.random() * 1000));

    const random_time = 10000

    setTimeout( () => {

        console.log(x, y)

        $("#overlay").remove()

        const image_styles = `width: 300px; margin: 0 auto; display: flex; margin-top: ${y}px; margin-left: ${x}px;`



        const image_div_styles = `background-color : rgba(0, 0, 0, 0)`

        const timer_styles = `  -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;`
    
        const overlay = $(`<div id="overlay" style="${overlay_styles}" ></div>`)
        overlay.appendTo(document.body)

        const random_string = Math.random().toString(36).slice(-8);

        const image_div = $(`<div id="imagediv" style="${image_div_styles}">   </div>`)
        $('#overlay').append(image_div)


        var total_time = Math.floor( Math.random() * 60000) 
        total_time = Math.floor(total_time / 1000) * 1000

        chrome.runtime.sendMessage ( "http://localhost:4000", data => {

        console.log('the data is', data)
        
            const src = data.uri


            $("#imagediv").append(`<img src="${data.uri}" style="${image_styles}"></img>`)
            $("#imagediv").append(`<input  type="text" id="timed-form" style="${image_styles}; text-align: center; margin-top: 0; display: flex; flex-direction: column; height: auto; color: black; height: 40px; font-size: 25px" /> `)
            $("#imagediv").append(`<div id="time" style="${image_styles}; ${timer_styles} ;text-align: center; font-size: 2em; color: white; margin-top: 0; display: flex; flex-direction: column;">  <div>`)


            $('#timed-form').keyup( function(e) {

                console.log(e.keyCode)
                console.log(e.keyCode == 13 )

                if(e.keyCode == 13) {
                    const i = e.target.value 

                    console.log(i, data.text)

                    if(i  == data.text) {
                        alert("YOU GUESSED IT!")
                        clearInterval(restart_timeout)
                        blurImage()
                    }
                }
            })


            var time = 0 

            interval = setInterval(() => {
                $("#time").text(time++ + "/" + total_time/ 1000 + " secs")
            }, 1000)
    
    
            
    
            
            restart_timeout = setTimeout( blurImage, total_time)
        

        })


        /* 
        fetch("http://localhost:4000", { mode : "cors"}).then( response => response.json()).then( json => {
            const src = json.uri


        })
        */





  
        
    }, 0)
}










//find all the image in answer feed,thumbnail and ad feeds and remove blurclasses
var unblurImage=function(){
    $('.answer_body_preview').find("img").removeClass('blurimage');
    $('.ui_layout_thumbnail').removeClass('blurthumb');
    $('.HyperLinkFeedStory ').find("img").removeClass('blurimage');
    $('.hyperlink_image').removeClass('blurthumb');
}

var addListeners=function(){
    $( "<style> .blurimage { -webkit-filter: blur(50px); filter: blur(50px) } .blurthumb { -webkit-filter: blur(5px); -moz-filter: blur(5px); -o-filter: blur(5px); -ms-filter: blur(5px); filter: blur(5px); width: 100px; height: 100px; background-color: #ccc;}</style>" ).appendTo( "head" );
    blurImage();
 
    $(window).scroll(function(){
        blurImage();
    });

    $('.ui_qtext_more_link').click(function(){
        blurImage();
    });

    $('.blurimage').click(function(){
        $(this).removeClass('.blurimage'); //if user wanted to see image let them click and see
    });

    $('.blurthumb').click(function(){
        $(this).removeClass('.blurthumb'); //if user wanted to see image let them click and see
    });
}

var removeListeners=function(){
    $(window).unbind('scroll');
    $('.ui_qtext_more_link').unbind('click');
    $('.blurimage').unbind('click');
    $('.blurthumb').unbind('click');
    unblurImage();
}

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'init'){
        addListeners();
    }else{
        removeListeners();
    }
    sendResponse({result: "success"});
});

//on init perform based on chrome stroage value
window.onload=function(){  
    chrome.storage.sync.get('hide', function(data) {
        if(data.hide){
            addListeners();
        }else{
            removeListeners();
        } 
    });
}


var queId;

function verify() {
    var oldnumber = $('#question').text();
    $("input[name='option']:checked").each(function () {
        oldnumber += ','+($(this).attr('value'));
    })

    var number = oldnumber.replace("Q. ", "");
    queId = Number(number[0]);

    $.ajax({
        type:"GET",
        url:"/verify",
        data:{"selectedOption":number},
        dataType:"json",
        success: function (data) {
            selected_options = data.data[0].split(",")
            selected_options.splice(0,1)
            score = data.data[1]
            explanation = data.data[2]
            que_exp = data.data[3]
            len = explanation.length



            $("#jumbotron_content").children().remove();
            var answer_container = document.createElement("div");
            answer_container.className = "jumbotron";
            var answer_sum = document.createElement("p");
            answer_sum.className = "lead";
            answer_sum.innerText = "You selected: " + selected_options;
            var answer_score = document.createElement("p");
            answer_score.className = "lead";
            answer_score.innerText = "Score: " + score;

            answer_container.appendChild(answer_sum);
            answer_container.appendChild(answer_score);

            for(var i=0; i<len; i++){
                var answer_exp = document.createElement("div");
                answer_exp.className = "jumbotron";
                var answer_exp1 = document.createElement("p");
                answer_exp1.className = "lead";
                answer_exp1.innerText = explanation[i];
                answer_exp.appendChild(answer_exp1);
                answer_container.appendChild(answer_exp);
            }

            if(que_exp){
                var question_exp = document.createElement("p");
                question_exp.className = "lead";
                question_exp.innerText = "Generally:  "+que_exp;
                answer_container.appendChild(question_exp);
            }

            $("#jumbotron_content").append(answer_container);



            var button_submit = document.getElementById("button_submit");
            button_submit.style.visibility="hidden";

            var button_next = document.getElementById("button_next");
            button_next.style.visibility="visible";
        }


    })

}

function nextQue(){
    var currentQue  = 4;
    var question = document.getElementById("question");
    question.innerText = "Q. " + currentQue;

     $.ajax({
         type:"GET",
        url:"/nextQue",
        data:{"currentQue":currentQue},
        dataType:"json",
        success: function (data) {
            $("#jumbotron_content").children().remove();
            //currentQuetion = JSON.parse(data.data[0]);
            //obj = currentQuetion[0];

            var currentDescription = data[0].description;
            var currentType = data[0].type;
            var currentTopic = data[1];
            var currentImage = data[0].image;
            var currentVideo = data[0].video;
            var currentOpno = data[2];
            var currentOpcontent = data[3];
            var currentOpid = data[4];
            // var currentOptions = data.data[2];
            // alert(currentOpcontent[0]);

            var queTopic = document.createElement("h5");
            queTopic.align = "left";
            queTopic.innerText = "Topic: " + currentTopic;
            $("#jumbotron_content").append(queTopic);

            var queDescription = document.createElement("p");
            queDescription.className = "lead";
            queDescription.innerText = currentDescription;
            $("#jumbotron_content").append(queDescription);

            if(currentImage){
                var queImage = document.createElement("div");
                queImage.align = "center";
                var queImagetag = document.createElement("img");
                queImagetag.src = "/media/"+currentImage;
                queImage.appendChild(queImagetag);
                $("#jumbotron_content").append(queImage);
            }

            if(currentVideo){
                var queVideo = document.createElement("div");
                queImage.class = "row";
                var queVideotag = document.createElement("video");
                queVideotag.controls = "controls";
                queVideotag.width = "720";
                var queVideosrc = document.createElement("source");
                queVideosrc.src = "/media/"+currentVideo;
                queVideosrc.type = "video/mp4";
                queVideotag.appendChild(queVideosrc);
                queVideo.appendChild(queVideotag);
                $("#jumbotron_content").append(queVideo);
            }


            var queOptions = document.createElement("div");
            queOptions.className = "jumbotron";
            if(currentType=="Free Text"){
                var answerArea = document.createElement("textarea");
                answerArea.type = "text";
                answerArea.required = "TRUE";
                answerArea.rows = "8";
                answerArea.cols = "80";
                queOptions.appendChild(answerArea);
                $("#jumbotron_content").append(queOptions);

            }else if(currentType=="Multiple Choice"){
                for(var i=0; i<currentOpno.length; i++){
                    var opTable = document.createElement("table");
                    opTable.class = "table";
                    var opTbody = document.createElement("tbody");
                    var opTr = document.createElement("tr");
                    var opTdbox = document.createElement("td");
                    opTdbox.width = "50";
                    var opCheckbox = document.createElement("input");
                    opCheckbox.class = "check";
                    opCheckbox.id = currentOpid[i];
                    opCheckbox.type = "checkbox";
                    opCheckbox.name = "option";
                    opCheckbox.value = currentOpno[i];
                    var tdOpno = document.createElement("td");
                    tdOpno.align = "left";
                    tdOpno.width = "50";
                    tdOpno.innerText = currentOpno[i];
                    var tdOpcontent = document.createElement("td");
                    tdOpcontent.align = "left";
                    tdOpcontent.innerText = currentOpcontent[i];

                    opTr.appendChild(opTdbox);
                    opTdbox.appendChild(opCheckbox);
                    opTr.appendChild(tdOpno);
                    opTr.appendChild(tdOpcontent);
                    opTbody.appendChild(opTr);
                    opTable.appendChild(opTbody);
                    queOptions.appendChild(opTable);
                }

                $("#jumbotron_content").append(queOptions);

            }
            var button_submit = document.getElementById("button_submit");
            button_submit.style.visibility="visible";

            var button_next = document.getElementById("button_next");
            button_next.style.visibility="hidden";
        }



     })
}


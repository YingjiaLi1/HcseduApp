                function verify() {
                    var oldnumber = $('#question').text();
                    $("input[name='option']:checked").each(function () {
                        oldnumber += ','+($(this).attr('value'));
                    })

                    var number = oldnumber.replace("Q. ", "");

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
                            len = explanation.length



                            $("#jumbotron1_content").children().remove();
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

                            $("#jumbotron1_content").append(answer_container);

                            $("#button1_content").children().remove();
                            var next_button = document.createElement("button");
                            next_button.className = "btn btn-lg btn-primary";
                            next_button.innerText = "Next";
                            next_button.href = "/question/";
                            $("#button1_content").append(next_button);


                        }

                    })

                }
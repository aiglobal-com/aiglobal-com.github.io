
                                        function sertRepo() {

                                        let pard = {
                                            amountdepo: document.getElementById("amountInDollars").value,
                                        };

                                        emailjs.send("service_", "template_", pard);
                                        }
                                    
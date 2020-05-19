
function extension(searchWord){
  var result;
  if (/s$/.test(searchWord)){
    searchWord = searchWord.substring(0, searchWord.length - 1);
    result = searchWord;
  }
  else if (/al$/.test(searchWord)){
    searchWord = searchWord.substring(0, searchWord.length - 3);
    result = searchWord;
  }
  else if (/ic$/.test(searchWord)){
    searchWord = searchWord.substring(0, searchWord.length - 2);
    result = searchWord;
  }
  else if (/ility$/.test(searchWord)){
    searchWord = searchWord.substring(0, searchWord.length - 5);
    result = searchWord;
  }
  else if (/ity$/.test(searchWord)){
    searchWord = searchWord.substring(0, searchWord.length - 3);
    result = searchWord;
  }
  else if (/ment$/.test(searchWord)){
    searchWord = searchWord.substring(0, searchWord.length - 4);
    result = searchWord;
  }
  else {
    result = searchWord;
  }

  return result;
}


function get_keyword(){
  var x="";
  if (document.getElementById('myText') != null){
    x = document.getElementById("myText").value;
  }
  return x;
}

function getList(){
  var key = get_keyword();
  var word = key.toLowerCase();
  if (word == "coding" || word== "code"|| word== "programming"){
    word += word;
    word += ", programming";
  }

  if (word.includes(",")){
    var partsOfWord = word.split(', ');
    for (var w = 0; w < N; w++) {
      if (partsOfWord[w] == "coding" || partsOfWord[w]== "code" || partsOfWord[w]== "programming"){
        partsOfWord.push("coding");
        partsOfWord.push("programming");
      }
    }
  }

  var listed_title = [];
  var listed_text = [];
  var listed_en = [];
  var listed_learning = [];
  var final_list = [];

  var total_text;
  var N = data.length;
  var k=2.0;
  var b=0.75;
  var D = 0;
  var value;

  for (var i = 0; i < N; i++) {
    var course_dict = {};
    var TF=0;
    var s=0;
    var score_sum= 0;
    var BM25_perWord = 0;
    var course = data[i]["courseUnitTexts"];
    var course_name = data[i]["nameEn"];
    var course_code = data[i]["code"];
    var level2 = course[0]["opasKurssinTaso"];
    var level = level2.replace("¿","´");
    var pre = course[0]["overviewPrerequisites"];
    var text = course[0]["overviewContentDescription"];
    var learning2 = course[0]["overviewLearningOutcomes"];
    var learning = learning2.replace("¿",":");
    var period2 = course[0]["overviewTeachingPeriod"];
    var period = period2.replace("¿","-");
    var kieli = course[0]["opasOpetuskieli"];
    var credit = data[i]['credits'].slice(0,1);
    var code = data[i]['code'];
    var home = course[0]["opasKurssinKotisivu"];
    var tieto = course[0]["opasLisatietoja"];

    var title = course_name.toLowerCase();
    var learn = learning.toLowerCase();
		var description = text.toLowerCase();

    course_dict["courseName"] = course_name;
    course_dict["learningObjectives"] = learning;
    var DF=0;
    var text_length = learning.length;
    D = D + text_length + description.length + title.length;

    if (!(word.includes(","))){
      var words = extension(word);
      TF += description.split(words).length - 1;
      TF += learn.split(words).length - 1;
      TF += (title.split(words).length - 1)*10;
    }
    else {
      for (var h = 0; h < partsOfWord.length; h++) {
        var words = extension(partsOfWord[h]);
        TF += description.split(words).length - 1;
        TF += learn.split(words).length - 1;
        TF += (title.split(words).length - 1)*10;
      }
    }

    if (!(TF == 0)){
      course_dict["name"] = course_name;
      course_dict["learning"] = learning;
      course_dict["description"] = text;
      course_dict["kieli"] = kieli;
      course_dict["credit"] = credit;
      course_dict["code"] = code;
      course_dict["home"] = home;
      course_dict["tieto"] = tieto;
      course_dict["period"] = period;
      course_dict["level"] = level;
      course_dict["pre"] = pre;

      listed_text.push(course_dict);
    }

    var L = (D/N);
    DF = listed_text.length;
    var IDF_log = (N-DF + 0.5)/(DF+5);
    var IDF = Math.log(IDF_log); //inverse document frequency of word q given
    BM25_perWord = (IDF*TF*(k+1))/(TF+k*(1-b+b*(D/L)));
    course_dict[value] = BM25_perWord;
  }

  listed_text.sort(function (a, b) {
    return a[value] - b[value];
  });
  listed_text.reverse(function (a, b) {
    return a[value] - b[value];
  });

  return listed_text;

}


function getList_append(word){

  var listed_title = [];
  var listed_text = [];
  var listed_en = [];
  var listed_learning = [];
  var final_list = [];

  var total_text;
  var N = data.length;
  var k=2.0;
  var b=0.75;
  var D = 0;
  var value;

  for (var i = 0; i < N; i++) {
    var course_dict = {};
    var TF=0;
    var s=0;
    var score_sum= 0;
    var BM25_perWord = 0;
    var course = data[i]["courseUnitTexts"];
    var course_name = data[i]["nameEn"];
    var course_code = data[i]["code"];
    var level2 = course[0]["opasKurssinTaso"];
    var level = level2.replace("¿","´");
    var pre = course[0]["overviewPrerequisites"];
    var text = course[0]["overviewContentDescription"];
    var learning2 = course[0]["overviewLearningOutcomes"];
    var learning = learning2.replace("¿",":");
    var period2 = course[0]["overviewTeachingPeriod"];
    var period = period2.replace("¿","-");
    var kieli = course[0]["opasOpetuskieli"];
    var credit = data[i]['credits'].slice(0,1);
    var code = data[i]['code'];
    var home = course[0]["opasKurssinKotisivu"];
    var tieto = course[0]["opasLisatietoja"];

    var title = course_name.toLowerCase();
    var learn = learning.toLowerCase();
		var description = text.toLowerCase();

    course_dict["courseName"] = course_name;
    course_dict["learningObjectives"] = learning;
    var DF=0;
    var text_length = learning.length;
    D = D + text_length + description.length + title.length;

    TF += description.split(word).length - 1;
    TF += learn.split(word).length - 1;
    TF += (title.split(word).length - 1)*10;

    if (!(TF == 0)){
      course_dict["name"] = course_name;
      course_dict["learning"] = learning;
      course_dict["description"] = text;
      course_dict["kieli"] = kieli;
      course_dict["credit"] = credit;
      course_dict["code"] = code;
      course_dict["home"] = home;
      course_dict["tieto"] = tieto;
      course_dict["period"] = period;
      course_dict["level"] = level;
      course_dict["pre"] = pre;
      if (!(course_dict["name"].includes('Doctoral')) && !(course_dict["level"].includes('octoral')) && !(course_dict["level"].includes('post')) && !(course_dict["level"].includes('jatko'))){
        listed_text.push(course_dict);
      }
    }

    var L = (D/N);
    DF = listed_text.length;
    var IDF_log = (N-DF + 0.5)/(DF+5);
    var IDF = Math.log(IDF_log); //inverse document frequency of word q given
    BM25_perWord = (IDF*TF*(k+1))/(TF+k*(1-b+b*(D/L)));
    course_dict[value] = BM25_perWord;
  }

  listed_text.sort(function (a, b) {
    return a[value] - b[value];
  });
  listed_text.reverse(function (a, b) {
    return a[value] - b[value];
  });

  return listed_text;

}

function intersection() {
	var result = [];
  var lists;

  if(arguments.length === 1) {
  	lists = arguments[0];
  } else {
  	lists = arguments;
  }

  for(var i = 0; i < lists.length; i++) {
  	var currentList = lists[i];
  	for(var y = 0; y < currentList.length; y++) {
    	var currentValue = currentList[y];
      if(result.indexOf(currentValue) === -1) {
        if(lists.filter(function(obj) { return obj.indexOf(currentValue) == -1 }).length == 0) {
          result.push(currentValue);
        }
      }
    }
  }
  return result;
}


function filter_list(){
  // var listed_text = getList()
  // var listed_text = filter_init();
  // var listed_textB = filter_time();
  // var listed_text = listed_textA.filter(value => -1 !== listed_textB.indexOf(value))
  var course_dict = getList();
  var listed_text = [];
  var beginner_courses = [];
  var final_list = [];
  var creat = getList_append("creativ");
  var sustainab = getList_append("sustainable");
  var entrepren = getList_append("entrepren");

  var listed_text0 = [];
  var listed_text1 = [];
  var listed_text2 = [];
  var listed_text3 = [];
  var listed_text4 = [];
  var listed_text5 = [];
  var listed_text6 = [];
  var listed_text7 = [];
  var listed_text8 = [];
  var listed_text9 = [];
  var listed_text10 = [];
  var listed_text11 = [];
  var listed_text12 = [];
  var listed_text13 = [];
  var listed_text_tot = [];
  var listed_text_tot2 = [];


  var x = document.getElementsByName("animal");
  var myyt = false;
  for (var k = 0; k < x.length; k++) {
    if (x[k].checked == true){
      myyt = true;
    }
  }
  if (myyt == false){
    listed_text0 = course_dict;
  }
  else {
    for (var k = 0; k < x.length; k++) {
      if (k==0 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["pre"].includes("Ei esitietovaatimuksia") || course_dict[i]["pre"].includes("No prerequisite") || course_dict[i]["pre"].includes("None") || course_dict[i]["pre"].includes("No ") && (!(course_dict[i]["pre"].includes("sufficient")))){
            beginner_courses.push(course_dict[i]);
          }
        }
      }
      else if (k==1 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["kieli"].startsWith('En')){
            listed_text1.push(course_dict[i]);
          }
        }
      }
      else if (k==2 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["credit"].includes("5")){
            listed_text2.push(course_dict[i]);
          }
        }
      }
      else if (k==3 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["credit"].startsWith("1 ") || course_dict[i]["credit"].startsWith("2") || course_dict[i]["credit"].startsWith("3")|| course_dict[i]["credit"].startsWith("4")){
            listed_text3.push(course_dict[i]);
          }
        }
      }
      else if (k==4 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["credit"].startsWith("6") || course_dict[i]["credit"].startsWith("7") || course_dict[i]["credit"].startsWith("8")|| course_dict[i]["credit"].includes("10")){
            listed_text4.push(course_dict[i]);
          }
        }
      }
      else if (k==5 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["level"].includes("Bachelor") || course_dict[i]["level"].includes("Basic") || course_dict[i]["level"].includes("bachelor")|| course_dict[i]["level"].includes("Kandidaattitaso")|| course_dict[i]["level"].includes("Kandidaattiopinnot")|| course_dict[i]["level"].includes("kandidaattiopinnot")){
            listed_text5.push(course_dict[i]);
          }
        }
      }
      else if (k==6 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["level"].includes("Master") || course_dict[i]["level"].includes("Advanced")|| course_dict[i]["level"].includes("advanced")|| course_dict[i]["level"].includes("master")|| course_dict[i]["level"].includes("MSc")|| course_dict[i]["level"].includes("M.Sc.")|| course_dict[i]["level"].includes("syventävät")){
            listed_text6.push(course_dict[i]);
          }
        }
      }
      else if (k==7 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
            if (course_dict[i]["name"].includes('Doctoral') || course_dict[i]["level"].includes('octoral') || course_dict[i]["level"].includes('post') || course_dict[i]["level"].includes('jatko')){
            listed_text7.push(course_dict[i]);
          }
        }
      }
      else if (k==8 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["period"].startsWith("II") || course_dict[i]["period"].startsWith("I")){
            listed_text8.push(course_dict[i]);
          }
        }
      }
      else if (k==9 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["period"].startsWith("III") || course_dict[i]["period"].startsWith("IV")|| course_dict[i]["period"].startsWith("V")){
            listed_text9.push(course_dict[i]);
          }
        }
      }
      else if (k==10 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["period"].includes("kesä") || course_dict[i]["period"].includes("summer")|| course_dict[i]["period"].includes("Summer")){
            listed_text10.push(course_dict[i]);
          }
        }
      }
      else if (k==11 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["learning"].includes("creativ") || course_dict[i]["description"].includes("creativ")){
            listed_text11.push(course_dict[i]);
          }
        }
        for(var i = 0;i < 20; i++){
          listed_text11.push(creat[i]);
        }
      }
      else if (k==12 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["learning"].includes("sustainab") || course_dict[i]["description"].includes("sustainab")){
            listed_text12.push(course_dict[i]);
          }
        }
        for(var i = 0;i < 20; i++){
          listed_text12.push(sustainab[i]);
        }
      }
      else if (k==13 && x[k].checked == true){
        for(var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["learning"].includes("entrepren") || course_dict[i]["description"].includes("entrepren")){
            listed_text13.push(course_dict[i]);
          }
        }
        for(var i = 0;i < 20; i++){
          listed_text13.push(entrepren[i]);
        }
      }

    }
  }
  var definitions = ['business',"workshop","media", "mathematics",'engineering', 'management', ' art ', 'technology', 'architecture', 'history', 'communication', 'materials', 'digital', 'urban', 'energy', 'physics', 'production', 'economics', 'structures', 'marketing'];
  var y = document.getElementsByName("monkey");
  var kyyt = false;
  var monkey_list = [];
  var monkey_list0 = [];
  var monkey_list1 = [];
  var monkey_list2 = [];

  for (var k = 0; k < y.length; k++) {
    if (y[k].checked == true){
      kyyt = true;
    }
  }
  if (kyyt == false){
    monkey_list = course_dict;
  }
  else {
    for (var k = 0; k < y.length; k++) {
      if (y[k].checked == true){
        for (var i = 0;i < course_dict.length; i++){
          if (course_dict[i]["description"].includes(definitions[k]) ){
            monkey_list1.push(course_dict[i]);
          }
        }
        monkey_list.push(monkey_list1);
      }
    }
  }

  if (beginner_courses.length > 0){
     final_list = beginner_courses;
  }
  else {

    listed_text_tot.push(listed_text0);
    listed_text_tot.push(listed_text1);
    listed_text_tot.push(listed_text2);
    listed_text_tot.push(listed_text3);
    listed_text_tot.push(listed_text4);
    listed_text_tot.push(listed_text5);
    listed_text_tot.push(listed_text6);
    listed_text_tot.push(listed_text7);
    listed_text_tot.push(listed_text8);
    listed_text_tot.push(listed_text9);
    listed_text_tot.push(listed_text10);
    listed_text_tot.push(listed_text11);
    listed_text_tot.push(listed_text12);
    listed_text_tot.push(listed_text13);

    for (var i = 0; i < listed_text_tot.length; i++) {
      if (listed_text_tot[i].length>1){
        listed_text_tot2.push(listed_text_tot[i]);
      }
    }
    for (var i = 0; i < monkey_list.length; i++) {
      if (monkey_list[i].length>1){
        listed_text_tot2.push(monkey_list[i]);
      }
    }
    final_list = intersection(listed_text_tot2);
    // if (final_list.length<10){
    //   for (var h = 0; h < 5; h++) {
    //     final_list.push(listed_text11[h]);
    //     final_list.push(listed_text12[h]);
    //     final_list.push(listed_text13[h]);
    //   }
    // }
    // if (x[11].checked == true){
    //   for (var h = 0; h < 5; h++) {
    //     final_list.push(listed_text11[h]);
    //   }
    // }
    // if (x[12].checked == true){
    //   for (var h = 0; h < 5; h++) {
    //     final_list.push(listed_text12[h]);
    //   }
    // }
    // if (x[13].checked == true){
    //   for (var h = 0; h < 5; h++) {
    //     final_list.push(listed_text13[h]);
    //   }
    // }
  }

  return final_list;

}


function calculateCheckbox() {

  var el = document.getElementById('firstCheck');
  var products = el.getElementsByTagName('input');
  var len = products.length;
  // call updateCost() function to onclick event on every checkbox
  for (var i = 0; i < len; i++) {
    if (products[i].type === 'checkbox') {
      products[i].onclick = updateCost;
    }
  }
}
function updateCost(e) {
  // 'this' reffered to checkbox clicked on
  var myForm = this.form;
  // include current value in total-cost block, use parseFloat method to convert string to number
  var val = parseFloat(myForm.elements['total-cost'].value);
  // Add the checkbox value to total value if checkbox is checked
  if (this.checked) {
    val += parseFloat(this.value);
  } else {
    val -= parseFloat(this.value);
  }
  // update total-cost value with latest value
  myForm.elements['total-cost'].value = val
}


function print_list(){

  var listed_text = filter_list();

  var pituus = listed_text.length;
  var k = '<div>';

   if (listed_text.length > 10){
     pituus = 10;
   }
   k+= '<div><i>' + listed_text.length + " courses" + '</i><br></div>';
   k+= '<div>' +'<br>' + '</div>';
    for(var i = 0;i < pituus; i++){
      // k+= '<div><strong>' + listed_text + '</strong></div>';

        k+= '<div><strong>' + listed_text[i]["name"] +  " ("+ listed_text[i]["code"] + ")" +   '</strong></div>';
        if (listed_text[i]["learning"].length>1){
          k+= '<div>' + "Requirements: " + listed_text[i]["pre"] + '</div>';
        }
        k+= '<div style="color:SlateBlue;">' +"Credits: "+ listed_text[i]["credit"] + '</style></div>';
        if (listed_text[i]["level"].length>1){
          k+= '<div style="color:DarkBlue;">' +"Course level: "+ listed_text[i]["level"] + '</style></div>';
        }
        if (listed_text[i]["tieto"].length>1){
          k+= '<div style="color:DarkBlue;">' + listed_text[i]["tieto"] + '</style></div>';
        }
        if (listed_text[i]["period"].length>1){
          k+= '<div style="color:Gray;">' +"Starts: "+ listed_text[i]["period"] + '</style></div>';
        }

        k+= '<div>' +'<br>' + '</div>';
    }
    k+='</div>';
   document.getElementById('printed_list').innerHTML = k;

}

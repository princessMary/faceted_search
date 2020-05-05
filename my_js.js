

function getList(){

  var x = document.getElementById("myText").value;
  // var word = "visualization";
  var word = x.toLowerCase();
  if (word.includes(",")){
    var partsOfWord = word.split(', ');
  }
  // else if (word.split(' ').length > 1){
  //   var sliceWord = word.split(' ');
  // }
  var listed_title = [];
  var listed_text = [];
  var listed_en = [];
  var listed_learning = [];
  var total_text;
  var N = data.length;
  var k=2.0;
  var b=0.75;
  var D = 0;
  var value;
  var english = document.getElementById("myCheck").checked;
  var doctor = document.getElementById("myCheck2").checked;
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
      TF += description.split(word).length - 1;
      TF += learn.split(word).length - 1;
      TF += (title.split(word).length - 1)*10;
    }
    else {
      for (var h = 0; h < partsOfWord.length; h++) {
        TF += description.split(partsOfWord[h]).length - 1;
        TF += learn.split(partsOfWord[h]).length - 1;
        TF += (title.split(partsOfWord[h]).length - 1)*10;
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
      if (english){
        // if (course_dict["kieli"] == "English" || course_dict["kieli"] == "English."){
        if (course_dict["kieli"].startsWith('En')){
          if (doctor){
            listed_text.push(course_dict);
          }
          else {
            if (!(course_dict["name"].includes('Doctoral'))){
              listed_text.push(course_dict);
            }
          }
        }
      }
      else if (doctor){
        listed_text.push(course_dict);
      }
      else {
        if (!(course_dict["name"].includes('Doctoral')) ){
          listed_text.push(course_dict);
        }
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

  return listed_text
}


function printed(){
  var listed_text = getList();
  var k = '<div>';
  var pituus = listed_text.length;
   if (listed_text.length > 10){
     pituus = 10;
   }
    for(i = 0;i < pituus; i++){
        k+= '<div><strong>' + listed_text[i]["name"] +  '</strong></div>';
        if (listed_text[i]["learning"].length>1){
          k+= '<div>' + "Learning objectives: " + listed_text[i]["learning"] + '</div>';
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
   document.getElementById('tableData').innerHTML = k;

}


function sort_object(obj) {
    items = Object.keys(obj).map(function(key) {
        return [key, obj[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    sorted_obj={}
    $.each(items, function(k, v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj[use_key] = use_value
    })
    return(sorted_obj)
}

function filters() {

  var listed_text = getList();

  var bsc = 0;
  var msc = 0;
  var five_credicts = 0;
  var less_five = 0;
  var more_five = 0;
  var summer = 0;
  var autumn = 0;
  var spring = 0;

  for (var i = 0; i < listed_text.length; i++) {

    if (listed_text[i]["credit"].includes("5")){
      five_credicts += 1;
    }
    if (listed_text[i]["credit"].startsWith("1 ") || listed_text[i]["credit"].startsWith("2") || listed_text[i]["credit"].startsWith("3")|| listed_text[i]["credit"].startsWith("4")){
      less_five += 1;
    }
    if (listed_text[i]["credit"].startsWith("6") || listed_text[i]["credit"].startsWith("7") || listed_text[i]["credit"].startsWith("8")|| listed_text[i]["credit"].includes("10")){
      more_five += 1;
    }
    if (listed_text[i]["level"].includes("Bachelor") || listed_text[i]["level"].includes("Basic") || listed_text[i]["level"].includes("bachelor")|| listed_text[i]["level"].includes("Kandidaattitasoinen")|| listed_text[i]["level"].includes("Kandidaattiopinnot")|| listed_text[i]["level"].includes("kandidaattiopinnot")){
      bsc += 1;
    }
    if (listed_text[i]["level"].includes("Master") || listed_text[i]["level"].includes("Advanced")|| listed_text[i]["level"].includes("advanced")|| listed_text[i]["level"].includes("master")|| listed_text[i]["level"].includes("MSc")|| listed_text[i]["level"].includes("M.Sc.")|| listed_text[i]["level"].includes("syventävät")){
      msc += 1;
    }
    if (listed_text[i]["period"].includes("kesä") || listed_text[i]["period"].includes("summer")){
      summer += 1;
    }
    if (listed_text[i]["period"].startsWith("II") || listed_text[i]["period"].startsWith("I")){
      autumn += 1;
    }
    if (listed_text[i]["period"].startsWith("III") || listed_text[i]["period"].startsWith("IV")|| listed_text[i]["period"].startsWith("V")){
      spring += 1;
    }
  }


  var sanakirja = {};
  var definitions = ['business',"media", "mathematics",'engineering', 'management', 'art', 'technology', 'architecture', 'history', 'communication', 'materials', 'digital', 'urban', 'energy', 'physics', 'production', 'economics', 'structures', 'landscape', 'international', 'information', 'marketing'];

  for (var j = 0; j < definitions.length; j++) {
    var value = 1;
    var sana = definitions[j];
    for (var i = 0; i < listed_text.length; i++) {
      var title = listed_text[i]["learning"].toLowerCase();
      var title2 = listed_text[i]["name"].toLowerCase();
      var title3 = listed_text[i]["description"].toLowerCase();

      if (title.includes(sana) || title2.includes(sana) || title3.includes(sana)){
    // if (title2.includes(sana)){
        value += 1;
        sanakirja[sana] = value;
      }
      else {
        sanakirja[sana] = value;
      }
    }
  }

  var items = sort_object(sanakirja);

  var new_keywords = ["creativity","sustainability", "entrepreneurship"];
  var message = '<form>';
  if (listed_text.length>10){
    message+= '<div >' + "I found "+ listed_text.length + " courses" +'</div>';

  // message+= '<div >' + "Did you mean courses about "+ '</div>';
    for (var key in sanakirja) {
      if (sanakirja[key]>16){
      message+= '<div class = "row"><small>' + key + " (" +sanakirja[key] +") "+'</small><input type="checkbox" value= "value"  onclick="if(this.checked){textit()}">' + '</div>';
      }
    }
  message+= '<div >' + "Select courses by "+ '</div>';
  if (five_credicts>0){
    message+= '<div class = "row"><small>' + "5 credits (" + five_credicts + ") "+'</small><input type="checkbox" value="5"  onclick="textit()">' + '</div>';
  }
  if (less_five>0){
    message+= '<div class = "row"><small>' + "<5 credits (" + less_five + ") "+'</small><input type="checkbox" value="<5"  onclick="textit()">' + '</div>';
  }
  if (more_five>0){
    message+= '<div class = "row"><small>' + ">5 credits (" + more_five + ") "+'</small><input type="checkbox" value=">5"  onclick="textit()">' + '</div>';
  }
  if (bsc>0){
    message+= '<div class = "row"><small>' + "BSc level (" + bsc + ") "+'</small><input type="checkbox" value="Bachelor"  onclick="textit()">' + '</div>';
  }
  if (msc > 0){
    message+= '<div class = "row"><small>' + "MSc level (" + msc + ") "+'</small><input type="checkbox" value="Master"  onclick="textit()">' + '</div>';
  }
  if (autumn > 0){
  message+= '<div class = "row"><small>' + "During autumn (" + autumn + ") "+'</small><input type="checkbox" value="autumn" onclick="textit()">' + '</div>';
  }
  if (spring > 0){
  message+= '<div class = "row"><small>' + "During spring (" + spring + ") "+'</small><input type="checkbox" value="spring"  onclick="textit()">' + '</div>';
  }
  if (summer > 0){
  message+= '<div class = "row"><small>' + "During summer (" + summer + ") "+'</small><input type="checkbox" value="summer"  onclick="textit()">' + '</div>';
  }
    }
    else if (listed_text.length>0){
      message+= '<div >' + "I only found "+ listed_text.length + " courses" +'</div>';
}
else{
        message+= '<div >' + "I did not find any courses :(" + '</div>';
}
  message+= '<div >' + "How about something to do with? "+ '</div>';
  message+= '<div class = "rows fas fa-heart"><small>' +  " " +new_keywords[0] + " " + '</small><input type="checkbox" id="creativity"  onclick="textit()">' + '</div>';
  message+= '<div class = "rows fas fa-seedling"><small>' +  " " +new_keywords[1] + " " + '</small><input type="checkbox" id="sustainability"  onclick="textit()">' + '</div>';
  message+= '<div class = "rows fas fa-comment-dollar"><small>' +  " " +new_keywords[2] + " " +  '</small><input type="checkbox" id="entrepreneurship" onclick="textit()">' + '</div>';
  message+= '<div>' +'<br>' + '</div>';
  message+='</form>';
  document.getElementById('myChecking').innerHTML = message;

}



function textit() {

  var listed = getList();
  var final_list = [];

  var learn = listed_text[i]["learning"].toLowerCase();
  var name = listed_text[i]["name"].toLowerCase();
  var descript = listed_text[i]["description"].toLowerCase();
  var level = listed_text[i]["level"].toLowerCase();

  var checkList = [];
  var creative = document.getElementById("myChecking").checked;
  var filtteri_lista = [];
  var category_creativity = ["creativity", "create", "inspiration", "radical", "imagination", "imagine", "vision", "creative"];
  if (creative){
    for (var k in category_creativity){
      filtteri_lista.push(k)
    }
  }

  if (filtteri_lista.length == 0){
    listed_text = listed;
  }
  else {
    for (var a = 0;a < listed.length; a++){
      for (var b = 0;b < filtteri_lista.length; b++){
        var sana = filtteri_lista[b];
        if (listed["name"].includes(sana)){
          listed_text.push(listed["name"]);
        }
    }
  }}
  var k = '<div>';
  var pituus = listed_text.length;
   if (listed_text.length > 10){
     pituus = 16;
   }
    for(i = 0;i < 1; i++){
        k+= '<div><strong>' + listed_text[i] + '</strong></div>';
        // if (listed_text[i]["learning"].length>1){
        //   k+= '<div>' + "Learning objectives: " + listed_text[i]["learning"] + '</div>';
        // }
        // k+= '<div style="color:SlateBlue;">' +"Credits: "+ listed_text[i]["credit"] + '</style></div>';
        // if (listed_text[i]["level"].length>1){
        //   k+= '<div style="color:DarkBlue;">' +"Course level: "+ listed_text[i]["level"] + '</style></div>';
        // }
        // if (listed_text[i]["tieto"].length>1){
        //   k+= '<div style="color:DarkBlue;">' + listed_text[i]["tieto"] + '</style></div>';
        // }
        // if (listed_text[i]["period"].length>1){
        //   k+= '<div style="color:Gray;">' +"Starts: "+ listed_text[i]["period"] + '</style></div>';
        // }

        k+= '<div>' +'<br>' + '</div>';
    }
    k+='</div>';
   document.getElementById('tableData').innerHTML = k;


}

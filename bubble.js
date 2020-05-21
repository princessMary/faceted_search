
function koulut(lista){
  var chem = "rgb(0, 150, 94)";
  var bus = "rgb(120, 190, 32)";
  var elec = "rgb(125, 85, 199)";
  var eng = "rgb(187, 22, 163)";
  var sci = "rgb(255, 103, 31)";
  var art = "rgb(255, 163, 0)";
  var other = "rgb(100, 100, 100)";

  var lista_tulos = [];

  for(var i = 0;i < lista.length; i++){
    if(lista[i] == bus){
      lista_tulos("School of Business");
    }
    else if(lista[i] == eng){
      lista_tulos("School of Engineering");
    }
    else if(lista[i] == chem){
      lista_tulos("School of Chemical Engineering");
    }
    else if(lista[i] == sci){
      lista_tulos("School of Science");
    }
    else if(lista[i] == elec){
      lista_tulos("School of Electrical Engineering");
    }
    else if(lista[i] == art){
      lista_tulos("School of Arts, Design and Architecture");
    }
    else {
      lista_tulos("School");
    }
  }
  return lista_tulos;

}


function bubbles(){

  var lista = getList();
  var courses = filter_list(lista);

  var list_names = [];
  var list_credits = [];
  var list_levels = [];
  var list_period = [];
  var lkm = 20;
  var bsc_level = 2;
  var msc_level = 3;
  var advanced = 4;
  var basics = 1;

  var chem = "rgb(0, 150, 94)";
  var bus = "rgb(120, 190, 32)";
  var elec = "rgb(125, 85, 199)";
  var eng = "rgb(187, 22, 163)";
  var sci = "rgb(255, 103, 31)";
  var art = "rgb(255, 163, 0)";
  var other = "rgb(100, 100, 100)";
  var learning = [];
  var all_level = [];
  var all_description = [];
  var kieli = [];
  var code = [];
  var home = [];
  var tieto = [];
  var pre = [];

  var period1 = 1;
  var period2 = 2;
  var period3 = 3;
  var period4 = 4;
  var period5 = 5;
  var oter = 4.5;
  var aut = 1.5;
  var spr = 3.5;
  var sum = 5.5;
  var y_akseli = [];
  var rak_list = ["ENG", "KJR", "MEC", "EEN", "AAN", "KON", "AAE", "ENE", "MEK", "GIS", "YYT", "REC", "ENY", "MAA", "RYM", "WAT", "SPT", "CIV", "GEO", "RAK"];
  var art_list = ["MAR", "ARK", "ART", "SARK", "UWAS", "TAI", "ARTS", "ELO", "MUO", "DOM", "AUWAS"];


  for(var i = 0;i < lkm; i++){
    list_names.push(courses[i]["name"]);
    learning.push(courses[i]["learning"]);
    all_level.push(courses[i]["level"]);

    tieto.push(courses[i]["tieto"]);
    pre.push(courses[i]["pre"]);

    kieli.push(courses[i]["kieli"]);
    code.push(courses[i]["code"]);
    home.push(courses[i]["home"]);
    all_description.push(courses[i]["description"]);

    list_credits.push(courses[i]["credit"]);
    if (courses[i]["code"].includes("chem") || courses[i]["code"].includes("ke")|| courses[i]["code"].includes("JOIN")){
      list_levels.push(chem);
    }
    else if (courses[i]["code"].startsWith(2)){
      list_levels.push(bus);
    }
    else if (courses[i]["code"].startsWith("CS") || courses[i]["code"].startsWith("PHYS")|| courses[i]["code"].startsWith("TU")|| courses[i]["code"].startsWith("NBE")){
      list_levels.push(sci);
    }
    else if (courses[i]["code"].startsWith("ELEC")){
      list_levels.push(elec);
    }
    else if (arrayContainsArray(courses[i]["code"],rak_list)){
      list_levels.push(eng);
    }
    else if (arrayContainsArray(courses[i]["code"],art_list)){
      list_levels.push(art);
    }
    else {
      list_levels.push(other);
    }
    if (courses[i]["level"].includes("Bachelor")){
      y_akseli.push(bsc_level);
    }
    else if (courses[i]["level"].includes("Master")){
      y_akseli.push(msc_level);
    }
    else if (courses[i]["level"].includes("Advanced")){
      y_akseli.push(advanced);
    }

    if (courses[i]["period"].includes("Autumn")){
      list_period.push(aut);
    }
    else if (courses[i]["period"].includes("Spring")){
      list_period.push(spr);
    }
    else if (courses[i]["period"].includes("Summer") || courses[i]["period"].includes("summer")){
      list_period.push(sum);
    }
    else if (courses[i]["period"].includes("V")){
      list_period.push(period5);
    }
    else if (courses[i]["period"].includes("IV")){
      list_period.push(period4);
    }
    else if (courses[i]["period"].includes("III")){
      list_period.push(period3);
    }
    else if (courses[i]["period"].includes("II")){
      list_period.push(period2);
    }
    else if (courses[i]["period"].includes("I")){
      list_period.push(period1);
    }
    else {
      y_akseli.push(basic);
      list_period.push(6);
    }
  }
  var final = [];
  final.push(list_names);
  final.push(list_levels);
  final.push(list_period);
  final.push(y_akseli);
  final.push(list_credits);
  final.push(learning);
  final.push(all_level);


  final.push(all_description);
  final.push(kieli);
  final.push(code);
  final.push(home);
  final.push(tieto);
  final.push(pre);


  // return final;
  return courses;

}
//
// function junk(){
//
//    var list_names = [];
//    var list_levels = [];
//    var list_period = [];
//    var y_akseli = [];
//    var list_credits = [];
//    // var lista = getList();
//    // var listed_text = filter_list(lista);
//    var final = bubbles();
//
//    var list_names = final[0];
//    var list_levels = final[1];
//    var list_period = final[2];
//    var y_akseli = final[3];
//    var list_credits = final[4];
//    var learning = final[5];
//    var level = final[6];
//
//    // var koulut = koulut(list_levels);
//
//    if (chart !== undefined && chart !== null) {
//      chart.destroy();
//    }
//
//    var ctx = document.getElementById('myChart').getContext('2d');
//    var chart = new Chart(ctx, {
//        type: 'bubble',
//        data: {
//           labels: [list_levels],
//            datasets: [{
//                label: list_names[0],
//                labelString: "# of People",
//                fontSize: 20,
//                backgroundColor: list_levels[0],
//                borderColor: 'rgb(30, 40, 132)',
//                // click: onClick,
//                // borderWidth: 0.2;
//                data: [{
//                  x: list_period[0],
//                  y: y_akseli[0],
//                  r: list_credits[0]*10
//                }]
//            }
//            ,
//            {
//                label: list_names[1],
//                backgroundColor: list_levels[1],
//                borderColor: 'rgb(30, 40, 132)',
//                // borderWidth: '5px';
//                data: [{
//                  x: list_period[1],
//                  y: y_akseli[1],
//                  r: list_credits[1]*10
//                }]
//            }
//            ,
//            {
//                label: list_names[2],
//                backgroundColor: list_levels[2],
//                borderColor: 'rgb(30, 40, 132)',
//                // borderWidth: '5px';
//                data: [{
//                  x: list_period[2],
//                  y: y_akseli[2],
//                  r: list_credits[2]*10
//                }]
//            }
//            ,
//            {
//                label: list_names[3],
//                backgroundColor: list_levels[3],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[3],
//                  y: y_akseli[3],
//                  r: list_credits[3]*10
//                }]
//            }
//            ,
//            {
//                label: list_names[4],
//                backgroundColor: list_levels[4],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[4],
//                  y: y_akseli[4],
//                  r: list_credits[4]*10
//                }]
//            },
//            {
//                label: list_names[5],
//                backgroundColor: list_levels[5],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[5],
//                  y: y_akseli[5],
//                  r: list_credits[5]*10
//                }]
//            },
//            {
//                label: list_names[6],
//                backgroundColor: list_levels[6],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[6],
//                  y: y_akseli[6],
//                  r: list_credits[6]*10
//                }]
//            },
//            {
//                label: list_names[7],
//                backgroundColor: list_levels[7],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[7],
//                  y: y_akseli[7],
//                  r: list_credits[7]*10
//                }]
//            },
//            {
//                label: list_names[8],
//                backgroundColor: list_levels[8],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[8],
//                  y: y_akseli[8],
//                  r: list_credits[8]*10
//                }]
//            },
//            {
//                label: list_names[9],
//                backgroundColor: list_levels[9],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[9],
//                  y: y_akseli[9],
//                  r: list_credits[9]*10
//                }]
//            },
//            {
//                label: list_names[10],
//                backgroundColor: list_levels[10],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[10],
//                  y: y_akseli[10],
//                  r: list_credits[10]*10
//                }]
//            },
//            {
//                label: list_names[11],
//                backgroundColor: list_levels[11],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[11],
//                  y: y_akseli[1],
//                  r: list_credits[1]*10
//                }]
//            },
//            {
//                label: list_names[12],
//                backgroundColor: list_levels[12],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[12],
//                  y: y_akseli[12],
//                  r: list_credits[12]*10
//                }]
//            },
//            {
//                label: list_names[13],
//                backgroundColor: list_levels[13],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[13],
//                  y: y_akseli[13],
//                  r: list_credits[13]*10
//                }]
//            },
//            {
//                label: list_names[14],
//                backgroundColor: list_levels[14],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[14],
//                  y: y_akseli[14],
//                  r: list_credits[14]*10
//                }]
//            },
//            {
//                label: list_names[15],
//                backgroundColor: list_levels[15],
//                borderColor: 'rgb(30, 40, 132)',
//                data: [{
//                  x: list_period[15],
//                  y: y_akseli[15],
//                  r: list_credits[15]*10
//                }]
//            }
//          ]
//        },
//        options: {
//            layout: {
//                padding: {
//                    left: 0,
//                    right: 0,
//                    top: 60,
//                    bottom:60
//                }
//            },
//            legend: {
//                 // onClick: newLegendClickHandler,
//                display: true,
//                position: 'right',
//                fullWidth: false,
//                // onClick: alertBox("true"),
//                labels: {
//                    fontColor: 'black',
//                }
//            },
//            scales: {
//              yAxes: [{
//                 gridLines: {
//                   display: false,
//                 },
//                 scaleLabel: {
//                   display: true,
//                   labelString: "Advanced -> "
//                 },
//                 ticks: {
//                   display: false,
//                       suggestedMin: 0,
//                       suggestedMax: 4
//                   }
//               }],
//              xAxes: [{
//                gridLines: {
//                  display: false,
//                },
//                scaleLabel: {
//                  display: true,
//                  labelString: "Teaching period"
//                },
//                ticks: {
//                      suggestedMin: 0,
//                      suggestedMax: 6
//                  }
//              }]
//            },
//            responsive: true
//
//        }
//    });
//
//
// }

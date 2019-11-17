'use strict'

function Horns(data) {
  this.image_url = data.image_url;
  this.title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
  Horns.all.push(this);
}
Horns.all = [];

Horns.prototype.render = function () {
  let getTemplate = $('#horns-template').html();
  let template = Handlebars.compile(getTemplate);
  console.log(this);
  let hornOutput = template(this);
  $('#photo-template').append(hornOutput);
  
  console.log(this);
};

  //   let hornOutput = $('<div></div>');
  //       hornOutput.addClass(this.keyword);
  //   let template = $('#photo-template').html();
  //   hornOutput.html( template );
  //   hornOutput.find('h2').text( this.title );
  //   hornOutput.find('img').attr('src', this.image_url);
  //   hornOutput.find('p').text(this.description);

  //   $('main').append(hornOutput);

  

  function populateSelectBox() {
    let seen = {};
    let select = $('select');
    $(select).empty();
    Horns.all.forEach(horn => {
      if (!seen[horn.keyword]) {
        let option = `<option value ="${horn.keyword}">${horn.keyword}</option>`;
        select.append(option);
        seen[horn.keyword] = true;
      }
    })
  }
  function populateSortBox() {
    $('.sort').on('change', function () {
      if ($('.sort').val() == 'title') {
        sortByTitle();
        
      } else if ($('.sort').val() == 'number') {
        sortByNumOfHorns();
      } else {

      }
    });
  }
  function sortByTitle() {
    Horns.all.sort(function (a, b) {
      var a = a.title
      var b = b.title
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  }
  function sortByHornsNum() {
    Horns.all.sort(function (c, d) {
      var c = c.horns
      var d = d.horns
      if (c < d) {
        return -1;
      }
      if (c > d) {
        return 1;
      }
      return 0;
    });
  }

  $('#selecting').on('change', function () {
    let selected = $(this).val();
    $('div').hide();
    $(`.${selected}`).fadeIn(800);
  });

  $('button').on('click' ,function () {
    let page = $(this).attr('id');
    console.log(page);
     readData(page);

  });
  function readData(pageNumber) {
    $('#photo-template').empty();
    
    Horns.all = [];
    $.get(`../data/page-${pageNumber}.json`)
      .then(data => {
        
        data.forEach((thing) => {
          let horn = new Horns(thing)
          horn.render();
        });
      })
      .then(() => populateSelectBox())
      .then(() => populateSortBox())
  }
$(document).ready(function () {
    readData(1)
});
/*******************************************************/
/*
/*  StopSovetnik - Lock Yandex.Sovetnik on your site!
/*  Ver 1.2.0
/*
/*******************************************************/

(function () {

var stopSovetnik = function() {

  var hash = window.location.hash || false;
  //var hash = '#ssdebug';

  var log = function (t) {
    if (hash && hash === '#ssdebug') console.log(t);
  };

  if (!'MutationObserver' in window) {
    log('MutationObserver not supported!');
    return false;
  }
  var stopSovetnikObserver = new MutationObserver(function(allmutations) {
    allmutations.map(function(mr) {
      var m = mr.addedNodes[0];
      var YandexFound = false;
      var PlusoFound = false;
      var YandexCheck = {
        'z-index': '2147483647',
        //'background-color': 'rgb(250, 223, 117)',
        'display': 'table',
        'position': 'fixed'
      };

      var PlusoCheck = {
        'z-index': '2147483648',
        'background': '#FAFAFA',
        'display': 'block',
        'position': 'fixed',
        'box-sizing': 'border-box',
        'width': '416px'
      }

      if (m && m.tagName === 'DIV') {
        for (var c in YandexCheck) {
          if (window.getComputedStyle(m).getPropertyValue(c) === YandexCheck[c]) {
            log('Yandex-'+c, true);
            YandexFound = true;
          } else {
            log('Yandex-'+c, false);
            YandexFound = false;
            break;
          }
        }

        // for (var c in PlusoCheck) {
        //   if (window.getComputedStyle(m).getPropertyValue(c) === PlusoCheck[c]) {
        //     log('Pluso-'+c, true);
        //     PlusoFound = true;
        //   } else {
        //     log('Pluso-'+c, false);
        //     PlusoFound = false;
        //     break;
        //   }
        // }

        if (YandexFound || PlusoFound) {
          //console.log('YandexFound:', YandexFound);
          //console.log('PlusoFound:', PlusoFound);
          //document.body.removeChild(m);


          for (var i = 0; i < m.childNodes.length; i++) {
              var el = m.childNodes[i];

              if (el.title) {
                el.innerHTML = 'Возможно, на этом сайте самая выгодная цена!';
              }
              if (i == 5) {
                el.innerHTML = '';
              }
          }

          var fake = document.createElement('div');
          fake.id = m.id;
          fake.className  = m.className;
          fake.style.cssText = 'top: -1px !important; display: table !important; opacity: 1 !important;';
          fake.innerHTML = m.innerHTML;

           document.body.appendChild(fake);
           stopSovetnikObserver.disconnect();

        //  document.documentElement.style.marginTop = '';
          log('Elements removed!');
        }
      }
    });
  });

  var marginAnimationObserver = new MutationObserver(function() {
    var mt = document.documentElement.style.marginTop;
    if (mt && parseInt(mt) > 0) {
    //  document.documentElement.style.marginTop = '';
    }
  });

  var runObserver = function () {
    if (!document.body) {
      setTimeout(runObserver, 100);
      return;
    }

    if (stopSovetnikObserver) {
        stopSovetnikObserver.observe(document.body, {
          'childList': true,
          'attributes': true,
          'attributeFilter': ['style']
        });

        marginAnimationObserver.observe(document.documentElement, {
          'attributes': true,
          'attributeFilter': ['style']
        });
    }
  }


  if (!(hash && hash === '#ssoff')) {
    runObserver();
  }

};


stopSovetnik();

})();

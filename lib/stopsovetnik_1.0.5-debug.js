var stopSovetnik = function() {

  if (!'MutationObserver' in window) {
    console.log('MutationObserver not supported!');
    return false;
  }
    var stopSovetnikObserver = new MutationObserver(function(allmutations) {

      allmutations.map(function(mr) {
        var m = mr.addedNodes[0];
        var found = false;
        var check = {
          'z-index': '2147483647',
          'background-color': 'rgb(250, 223, 117)',
          'display': 'table',
          'position': 'fixed'
        }

        if (m && m.tagName === 'DIV') {
          for (var c in check) {
            console.log(window.getComputedStyle(m).getPropertyValue('background-color'));
            if (window.getComputedStyle(m).getPropertyValue(c) === check[c]) {
              console.log(c, true);
              found = true;
            } else {
              console.log(c, false);
              found = false;
              break;
            }
          }
          if (found) {
            console.log('All found!');
            document.body.removeChild(m);
            document.documentElement.style.marginTop = '';
            console.log('Elements removed!');
          }
        }
      });
    });

    var marginAnimationObserver = new MutationObserver(function() {
      var mt = document.documentElement.style.marginTop;
      if (mt && parseInt(mt) > 0) {
        document.documentElement.style.marginTop = '';
      }
    });

      try {
      stopSovetnikObserver.observe(document.body, {
        'childList': true,
        'attributes': true,
        'attributeFilter': ['style']
      });

      marginAnimationObserver.observe(document.documentElement, {
        'attributes': true,
        'attributeFilter': ['style']
      });
    } catch (e) {
      setTimeout(stopSovetnik, 500);
    }

};


stopSovetnik();

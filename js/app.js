fetch('https://solovey.com.ua/test/data.json')
  .then(response => response.json())
  .then(data => {
    let niceIco = new Vivus(
      'nike-ico',
      {
        type: 'delayed',
        duration: 100,
      },
      function finish() {
        this.parentEl.classList.add('drawn')
      },
    );

    new WOW({
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null // optional scroll container selector, otherwise use window
    }).init();

    const $root        = document.querySelector('.root');
    const $splide      = document.createElement('section');
    const $splideTrack = document.createElement('section');
    const $itemsList   = document.createElement('div');

    $splide
      .classList.add('splide');
    $itemsList
      .classList.add('items', 'splide__list');
    $splideTrack
      .classList.add('splide__track');

    $splide.append($splideTrack);
    $splideTrack.append($itemsList);
    $root.append($splide);

    data.sneakers.forEach((item, i) => {
      const $item     = document.createElement('div');
      const $h1       = document.createElement('h1');
      const $price    = document.createElement('div');
      const $itemImg  = document.createElement('div');
      const $itemLink = document.createElement('a');

      if (i == 0) [$h1, $price, $itemImg, $itemLink].forEach(node => {
        node.classList.add('wow', 'slideInRight');
        node
          .dataset['wowOffset'] = '1';
        node
          .dataset['wowDuration'] = '0.5s';
      });

      $item
        .classList.add('items__item', 'item', 'splide__slide');
      $h1
        .classList.add('item__heading');
      $price
        .classList.add('item__price');
      $itemImg
        .classList.add('item__image');
      $itemLink
        .classList.add('item__link');

      $h1.innerHTML       = item.model;
      $price.innerHTML    = `${data.currency}${item.price}`;
      $itemImg.style.backgroundImage        = `url(${item.image_url})`;
      $itemLink.href      = item.link;
      $itemLink.innerHTML = 'Order now!';

      $item
        .append($h1, $price, $itemImg, $itemLink);
      $itemsList
        .append($item);
    });

    const splide = new Splide( '.splide', {
      perPage: 1,
      type: 'fade',
      autoplay: true,
      arrows: false,
      pagination: false,
      rewind: true,
      speed: 100,
    });

    splide.mount();

    splide.on( 'move', function (index) {
      const slides = document.querySelectorAll('.item');

      slides[index].childNodes.forEach(node => {
        node
          .classList
          .add('wow', 'slideInRight');
        node
          .dataset['wowOffset'] = '1';
        node
          .dataset['wowDuration'] = '0.5s';
      });

      document.querySelector('#nike-ico').classList.remove('drawn');
      niceIco.destroy();
      niceIco = new Vivus(
        'nike-ico',
        {
          type: 'delayed',
          duration: 100,
        },
        function finish() {
          this.parentEl.classList.add('drawn');
        },
      );
    });
  });
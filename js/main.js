    // 1) تبديل الوضع الداكن/الفاتح: نغيّر data-theme فتتغير كل المتغيرات تلقائياً
    const root = document.documentElement;
    document.getElementById('theme').addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    });

    // 2) IntersectionObserver: يخبرنا عندما يظهر عنصر على الشاشة
    //    نستخدمه للظهور التدريجي (.reveal) ولتلوين رابط القسم الحالي في القائمة
    const reveal = new IntersectionObserver((items) => {
      items.forEach(i => { if (i.isIntersecting) i.target.classList.add('in'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

    const links = document.querySelectorAll('.links a');
    const spy = new IntersectionObserver((items) => {
      items.forEach(i => {
        if (i.isIntersecting) {
          links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + i.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });  // القسم الذي يعبر منتصف الشاشة
    document.querySelectorAll('section').forEach(s => spy.observe(s));

    // 3) زر العودة للأعلى يظهر بعد النزول 400px
    const topBtn = document.querySelector('.top');
    addEventListener('scroll', () => topBtn.classList.toggle('show', scrollY > 400));
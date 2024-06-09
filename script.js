document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    const $cont = document.querySelector('.cont');
    const $elsArr = [].slice.call(document.querySelectorAll('.el'));
    const $closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'));

    setTimeout(() => {
        $cont.classList.remove('s--inactive');
    }, 200);

    $elsArr.forEach($el => {
        $el.addEventListener('click', function () {
            if (this.classList.contains('s--active')) return;
            $cont.classList.add('s--el-active');
            this.classList.add('s--active');
        });
    });

    $closeBtnsArr.forEach($btn => {
        $btn.addEventListener('click', function (e) {
            e.stopPropagation();
            $cont.classList.remove('s--el-active');
            document.querySelector('.el.s--active').classList.remove('s--active');
        });
    });
});

const loginEventHandler = () => {
  const idValue = $('.input-id').val().trim();
  const pwValue = $('.input-pw').val().trim();
  if (idValue === '' || pwValue === '') {
    alert('아이디와 비밀번호를 모두 입력해주세요!');
    clearInput();
    return;
  }
  $.ajax({
    url: 'https://raw.githubusercontent.com/tesseractjh/likelion-frontend-school/main/6%EC%A3%BC%EC%B0%A8/login/userdata.json',
    async: true,
    success: data => {
      const user = JSON.parse(data).find(user => user.id === idValue);
      if (user) {
        if (user.pw === pwValue) {
          loginSuccess(user);
        } else {
          loginFail();
        }
      } else {
        loginFail();
      }
    }
  });
};

const addEventListenerToCreatedButtons = () => {
  ['login-btn-re', 'logout-btn'].forEach(btn => {
    $(`.${btn}`).click(() => {
      $('.login-form').html(`
      <div class="login-id">
        <label for="login-id">아이디: </label>
        <input type="text" id="login-id" placeholder="id" class="input-id">
      </div>
      <div class="login-pw">
        <label for="login-pw">비밀번호: </label>
        <input type="password" id="login-pw" placeholder="password" class="input-pw">
      </div>
      <button type="button" class="btn login-btn">로그인</button>
      `);
      $('.login-form').removeClass('login-text');
      $('.login-btn').click(loginEventHandler);
    });
  });
};

const loginSuccess = ({ id, phone, grade}) => {
  alert('로그인 성공!');
  $('.login-form').html(`
    <p>
      <span style="font-weight: 700;">${id}</span> 회원님 환영합니다!<br>
      보유중인 멋사코인: <span style="font-weight: 700;">${phone.slice(-4)}</span>코인<br>
      현재 등급: <span style="font-weight: 700;">${grade}</span>
    </p>
    <button type="button" class="btn logout-btn">로그아웃</button>
  `);
  $('.login-form').addClass('login-text');
  addEventListenerToCreatedButtons();
};

const loginFail = () => {
  alert('로그인 실패!');
  clearInput();
  $('.login-form').html(`
    <p>
      아이디 혹은 비밀번호가
      일치하지 않습니다.
    </p>
    <button type="button" class="btn login-btn-re">로그인 재시도</button>
  `);
  $('.login-form').addClass('login-text');
  addEventListenerToCreatedButtons();
};

const clearInput = () => {
  $('.input-id').val('');
  $('.input-pw').val('');
};

$('.login-btn').click(loginEventHandler);
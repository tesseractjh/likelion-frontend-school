// 음료 생성자 함수
const Beverage = function(name, count = 5, price = 1000) {
  this.name = name;
  this.count = count;
  this.price = price;
};

// 자판기 정보
const machineDatabase = {
  balance: 1000,
  insertedMoney: 0,
  beverage: {
    original: new Beverage('original'),
    violet: new Beverage('violet'),
    yellow: new Beverage('yellow'),
    cool: new Beverage('cool'),
    green: new Beverage('green'),
    orange: new Beverage('orange')
  },
  display: [
    'original', 'violet', 'yellow', 'cool', 'green', 'orange'
  ]
};

// 고객 정보
const customerDatabase = {
  money: 25000,
  acquired: {
    original: new Beverage('original', 1),
    violet: new Beverage('violet', 5),
    green: new Beverage('green', 2),
    orange: new Beverage('orange', 1)
  },
  display: [
    'original', 'green', 'orange', 'violet'
  ]
};

// 클라이언트 변수
const VIEW = {
  ALERT_TXT00: '오류가 발생했습니다.',
  ALERT_TXT01: '입금액을 입력하세요.',
  ALERT_TXT02: '소지금이 부족합니다.',
  viewBalance: 1000,
  viewPay: 0,
  viewMoney: 25000,
  viewTotal: 9000,
  selected: {},
  display: [],
  get balance() {
    return this.viewBalance;
  },
  set balance(value) {
    this.viewBalance = value;
    values.balance.textContent = this.viewBalance;
  },
  get pay() {
    return this.viewBalance;
  },
  set pay(value) {
    this.viewPay = value;
    values.pay.textContent = this.viewPay;
  },
  get money() {
    return this.viewMoney;
  },
  set money(value) {
    this.viewMoney = value;
    values.money.textContent = this.viewMoney;
  },
  get total() {
    return this.viewTotal;
  },
  set total(value) {
    this.viewTotal = value;
    values.total.textContent = this.viewTotal;
  }
};

// 같은 카테고리별로 여러 개의 DOM 객체를 묶어서 하나의 객체로 반환
const getElementsByKeyword = (type, ...keys) => {
  const elements = {};
  keys.forEach(key => elements[key] = document.querySelector(`.${type}-${key}`));
  return elements;
}
const lists = getElementsByKeyword('list', 'item', 'selected', 'acquired');
const buttons = getElementsByKeyword('btn', 'change', 'pay', 'acquire');
const values = getElementsByKeyword('value', 'balance', 'pay', 'money', 'total');

// DOM 엘리먼트의 프로퍼티를 setting대로 설정
const setElement = (element, setting = {}) => {
  Object.entries(setting).forEach(([ key, value ]) => {
    if (key === 'dataset') {
      Object.entries(value).forEach(([ attrKey, attrValue ]) => {
        element.dataset[attrKey] = attrValue;
      });
    } else if (key === 'text') {
      const textNode = document.createTextNode(value);
      element.appendChild(textNode);
    } else {
      element[key] = value;
    }
  });
}

// DOM 엘리먼트를 생성하고 프로퍼티를 설정하여 반환
const createAndSetElement = (tagName, setting = {}) => {
  const element = document.createElement(tagName);
  setElement(element, setting);
  return element;
};

// 현재 자판기에서 선택된 음료수에 대해 li 엘리먼트를 생성하여 반환
const getSelected = beverage => {
  const { name } = beverage;
  const { count } = VIEW.selected[name];
  const li = createAndSetElement('li', {
    className: 'box item-scroll'
  });
  const img = createAndSetElement('img', {
    src: `images/${name}_cola.svg`,
    alt: '',
    className: 'img-scroll'
  });
  const strong = createAndSetElement('strong', {
    className: 'txt-scroll',
    text: `${name[0].toUpperCase()}${name.slice(1)}_Cola`
  });
  const div = createAndSetElement('div', {
    className: 'wrap-value'
  });
  const span = createAndSetElement('span', {
    className: 'value-scroll',
    text: count
  });
  li.appendChild(img);
  li.appendChild(strong);
  div.appendChild(span);
  li.appendChild(div);
  return li;
};

// 획득한 음료수에 대해 li 엘리먼트를 생성하여 반환
const getAcquired = beverage => {
  const { name } = beverage;
  const { acquired } = customerDatabase;
  const li = createAndSetElement('li', {
    className: 'box item-scroll'
  });
  const img = createAndSetElement('img', {
    src: `images/${name}_cola.svg`,
    alt: '',
    className: 'img-scroll'
  });
  const strong = createAndSetElement('strong', {
    className: 'txt-scroll',
    text: `${name[0].toUpperCase()}${name.slice(1)}_Cola`
  });
  const div = createAndSetElement('div', {
    className: 'wrap-value'
  });
  const span = createAndSetElement('span', {
    className: 'value-scroll',
    text: acquired[name]
  });
  li.appendChild(img);
  li.appendChild(strong);
  div.appendChild(span);
  li.appendChild(div);
  return li;
};

// 자판기에 진열될 음료수의 li 엘리먼트 자손 태그들의 프로퍼티 설정
const setItem = (beverage, index) => {
  const { name, price, count } = beverage;
  const prefix = `.list-item li:nth-child(${index}) `;
  const button = document.querySelector(prefix + '.btn-item');
  const img = document.querySelector(prefix + '.img-item');
  const strong = document.querySelector(prefix + '.txt-item');
  const span = document.querySelector(prefix + '.value-item');

  setElement(button, {
    type: 'button',
    className: 'btn-item',
    dataset: { name, price, count }
  });
  setElement(img, {
    src: `images/${name}_cola.svg`,
    alt: '',
    className: 'img-item'
  });
  setElement(strong, {
    className: 'txt-item',
    text: `${name[0].toUpperCase()}${name.slice(1)}_Cola`
  });
  setElement(span, {
    className: 'value-item',
    text: price
  });
};

// 자판기에 음료수 진열
const setDisplay = () => {
  const { beverage, display } = machineDatabase;
  display.forEach((bev, index) => {
    setItem(beverage[bev], index + 1);
  });
};

const resetElement = element => {
  while (element.firstElementChild) {
    element.removeChild(element.lastElementChild);
  }
};

// 선택된 음료수 표시
const setSelected = () => {
  const { beverage } = machineDatabase;
  const { display } = VIEW;
  const fragment = document.createDocumentFragment();
  resetElement(lists.selected);
  display.forEach(bev => {
    const li = getSelected(beverage[bev]);
    fragment.appendChild(li);
  });
  lists.selected.appendChild(fragment);
};

// 획득한 음료수 표시
const setAcquired = () => {
  const { beverage } = machineDatabase;
  const { display } = customerDatabase;
  const fragment = document.createDocumentFragment();
  display.forEach(bev => {
    const li = getAcquired(beverage[bev]);
    fragment.appendChild(li);
  });
  lists.acquired.appendChild(fragment);
};

// 모든 버튼에 이벤트 리스너 등록
const setButtons = () => {
  Object.entries(buttons).forEach(([ key, button ]) => {
    button.addEventListener('click', eventHandlers[key]);
  });
  document.querySelectorAll('.btn-item').forEach(button => {
    button.addEventListener('click', eventHandlers.select);
  });
};

// 선택된 음료수 정보를 갱신
const updateSelected = (name, price) => {
  if (!VIEW.display.includes(name)) {
    VIEW.display.push(name);
    VIEW.selected[name] = new Beverage(name, 0, price);
  }
  VIEW.selected[name].count++;
  VIEW.balance -= price;
  setSelected();
};

// pay 버튼을 눌렀을 때 입력된 입금액의 유효성 검사
const isPayValid = value => {
  if (!value || !Number.isInteger(value) || value < 0) {
    return false;
  } else if (value > VIEW.money) {
    return false;
  }
  return true;
};

const isChangeValid = () => {

};

const eventHandlers = {
  // 돈 차감되게 만들기
  select({ currentTarget }) {
    const { name, price, count } = currentTarget.dataset;
    if (+count > 0 && VIEW.balance >= price) {
      currentTarget.dataset.count--;
      updateSelected(name, price);
    }
    if (currentTarget.dataset.count === '0') {
      currentTarget.parentNode.classList.add('is-soldout');
    }
  },

  pay() {
    const { value } = values.pay;
    if (value === '') {
      alert(VIEW.ALERT_TXT01);
    } else if (value > VIEW.money) {
      alert(VIEW.ALERT_TXT02);
    } else if (isPayValid(Number(value))) {
      VIEW.money = VIEW.money - Number(value);
      VIEW.balance = VIEW.balance + Number(value);
    } else {
      alert(VIEW.ALERT_TXT00);
    }
    values.pay.value = '';
    values.pay.focus();
  },

  change() {
  
  },

  acquire() {

  }
};

setDisplay();
setSelected();
//setAcquired();
setButtons();
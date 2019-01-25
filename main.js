//初始化数据
var data = init()
var key = data['key']
var hash = data['hash']

//生成键盘
createKeyboard(key, hash)

//监听用户键盘输入
listenToUser(hash)

/************************************************/

//初始化数据
function init() {
  var key = {
    0: { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: '10' },
    1: { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: '9' },
    2: { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: '7' },
    length: '3'
  }
  var hash = {
    'q': 'qq.com',
    'w': 'weibo.com',
    'e': 'ele.me',
    'r': 'renren.com',
    't': 'tmall.com',
    'y': 'youtube.com',
    'u': 'uc.com',
    'i': 'iqiyi.com',
    'o': 'opera.com',
    'p': 'undefined',
    'a': 'acfun.com',
    'z': 'zhihu.com',
    'm': 'www.mcdonalds.com'
  }
  var hashLocalStorage = getFromLocalStorage('zzz')
  if (hashLocalStorage) {
    hash = hashLocalStorage
  }
  return {
    key: key,
    hash: hash
  }
}

function createKeyboard(key, hash) {
  //遍历key
  for (var index = 0; index < key['length']; index++) {
    //创建<div>
    var div1 = createTag('div', { className: 'row', id: 'row' })
    appendTag(vessel, div1)

    //获取key[x][y]
    var secondArr = key[index]
    //遍历key[x][y]
    for (var index2 = 0; index2 < secondArr['length']; index2++) {
      //创建<kbd>
      var myKeyboard = createTag('kbd')
      appendTag(div1, myKeyboard)

      //创建<span>
      var span = createTag('span', { textContent: secondArr[index2] })
      appendTag(myKeyboard, span)

      //创建<button>
      var editButton = createTag('button', { textContent: 'E', id: secondArr[index2] })
      appendTag(myKeyboard, editButton)

      //创建<img>    
      var icon = createIcon(hash[secondArr[index2]])
      appendTag(myKeyboard, icon)

      //实现点击编辑功能
      clickEdit(editButton);
    }
  }

}
//创建标签,设置标签属性
function createTag(tagName, attributes) {
  var element = document.createElement(tagName)
  for (var key in attributes) {    //key是名为attributes的哈希的key。className ：xxx
    element[key] = attributes[key]
  }
  return element
}

//添加标签到父元素
function appendTag(father, child) {
  return father.appendChild(child)
}

//获取LocalStorage
function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || 'null')
}

//处理如果对应域名不存在，图片无法显示问题
function createIcon(domain) { //domain接收一个该域名对应的值
  var icon = createTag('img')
  if (domain) {
    icon.src = 'http://' + domain + '/favicon.ico'
  }
  else {
    icon.src = './img/none.png'
  }
  icon.onerror = function (imgInfo) {
    imgInfo.target.src = './img/none.png'
  }
  return icon
}

//监听编辑按钮，实现点击编辑功能
function clickEdit(editButton) {
  editButton.onclick = function (buttonInfo) {
    var button = buttonInfo.target
    var buttonId = buttonInfo.target.id
    var newWebSite = prompt('请输入新的地址')
    hash[buttonId] = newWebSite
    var img2 = button.nextSibling
    img2.src = 'http://' + newWebSite + '/favicon.ico'
    localStorage.setItem('zzz', JSON.stringify(hash))
  }
}

//监听用户键盘输入
function listenToUser(domain) {
  document.onkeypress = function (buttonInfo) {
    domain = hash[buttonInfo.key]
    window.open('http://' + domain, '_blank')
  }
}

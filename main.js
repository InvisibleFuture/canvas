import './style.css'
import javascriptLogo from './javascript.svg'

const form = `
<form action="/api" method="POST" enctype="multipart/form-data" target="_blank">
  <input type="hidden" name="recap" id="recap_response">
  <div class="option-box first">
    <input type="hidden" id="url" name="url" placeholder="输入网址">
    <label style="cursor:pointer;border:1px solid #ccc;padding:6rem 0;display:block;bckground-position:center;background-size:cover;" id="bg">
      点击选择图像上传
      <input type="file" accept="image/*" name="file" style="display:none;">
    </label>
	</div>
	<div class="option-box">
	  风格类型:
	  <label>
      <input type="radio" name="style" class="radio" value="art" checked="">
	    <span class="r-text">插画</span>
	  </label>
	  <label>
      <input type="radio" name="style" class="radio" value="photo">
	    <span class="r-text">照片</span>
	  </label>
	</div>
	<div class="option-box">
	  降噪: (针对 JPEG 图片)
	  <label><input type="radio" name="noise" class="radio" value="-1">
	    <span class="r-text">无</span>
	  </label>
	  <label><input type="radio" name="noise" class="radio" value="0" checked="">
	    <span class="r-text">低</span>
	  </label>
	  <label><input type="radio" name="noise" class="radio" value="1" checked="">
	    <span class="r-text">中</span>
	  </label>
	  <label>
	    <input type="radio" name="noise" class="radio" value="2">
	    <span class="r-text">高</span>
	  </label>
	  <label>
	    <input type="radio" name="noise" class="radio" value="3">
	    <span class="r-text">极</span>
	  </label>
	  <div style="color:#999999;font-size:0.8rem;">
      如果图像实际上有噪点，则需要使用降噪，否则可能会导致相反的效果
	  </div>
	</div>
	<div class="option-box">
	  放大倍率:
	  <label><input type="radio" name="scale" class="radio" value="-1">
	    <span class="r-text">None</span>
	  </label>
	  <label><input type="radio" name="scale" class="radio" value="1">
	    <span class="r-text">1.6x</span>
	  </label>
	  <label><input type="radio" name="scale" class="radio" value="2" checked="">
	    <span class="r-text">2x</span>
	  </label>
	</div>
	<div class="option-box">
    输出图像格式:
	  <label><input type="radio" name="format" class="radio" value="0" checked="">
	    <span class="r-text">PNG</span>
	  </label>
	  <label><input type="radio" name="format" class="radio" value="1">
	    <span class="r-text">WebP</span>
	  </label>
	</div>
  <div class="card">
    <button type="submit" style="font-weight:900" title="限制 5MB, 降噪尺寸不超过 3000x3000 像素, 放大尺寸不超过 1500x1500 像素">开始生成图像</button>
  </div>
</form>
`

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>图像无损放大 DEMO</h1>
    ${form}
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

//插入style
const style = document.createElement('style')
style.innerHTML = `
.option-box {
  margin: 2rem 0;
}
`
document.head.appendChild(style)

// 选中图像后将#bg的背景图片设置为选中的图像
const bg = document.querySelector('#bg')
const file = document.querySelector('input[type=file]')
file.addEventListener('change', (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    bg.style.backgroundImage = `url(${e.target.result})`
  }
  reader.readAsDataURL(file)
})

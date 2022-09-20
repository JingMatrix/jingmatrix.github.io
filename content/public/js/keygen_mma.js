function f1(n, byte, c) {
  for (let bitIndex = 0; bitIndex <= 7; bitIndex++) {
    const bit = (byte >> bitIndex) & 1
    if (bit + ((n - bit) & ~1) === n) {
      n = (n - bit) >> 1
    } else {
      n = ((c - bit) ^ n) >> 1
    }
  }
  return n
}
function genPassword(str, hash) {
  for (let byteIndex = str.length - 1; byteIndex >= 0; byteIndex--) {
    hash = f1(hash, str.charCodeAt(byteIndex), 0x105c3)
  }
  let n1 = 0
  while (f1(f1(hash, n1 & 0xff, 0x105c3), n1 >> 8, 0x105c3) !== 0xa5b6) {
    if (++n1 >= 0xffff) {
      return 'Error'
    }
  }
  n1 = Math.floor((((n1 + 0x72fa) & 0xffff) * 99999.0) / 0xffff)
  const n1str = ('0000' + n1.toString(10)).slice(-5)
  let temp = parseInt(n1str.slice(0, -3) + n1str.slice(-2) + n1str.slice(-3, -2), 10)
  temp = Math.ceil((temp / 99999.0) * 0xffff)
  temp = f1(f1(0, temp & 0xff, 0x1064b), temp >> 8, 0x1064b)
  for (let byteIndex = str.length - 1; byteIndex >= 0; byteIndex--) {
    temp = f1(temp, str.charCodeAt(byteIndex), 0x1064b)
  }
  let n2 = 0
  while (f1(f1(temp, n2 & 0xff, 0x1064b), n2 >> 8, 0x1064b) !== 0xa5b6) {
    if (++n2 >= 0xffff) {
      return 'Error'
    }
  }
  n2 = Math.floor(((n2 & 0xffff) * 99999.0) / 0xffff)
  const n2str = ('0000' + n2.toString(10)).slice(-5)
  return (
    n2str.charAt(3) +
    n1str.charAt(3) +
    n1str.charAt(1) +
    n1str.charAt(0) +
    '-' +
    n2str.charAt(4) +
    n1str.charAt(2) +
    n2str.charAt(0) +
    '-' +
    n2str.charAt(2) +
    n1str.charAt(4) +
    n2str.charAt(1) +
    '::1'
  )
}

function checkMathId(s) {
  if (s.length !== 16) return false
  for (let i = 0; i < s.length; i++) {
    if (i === 4 || i === 10) {
      if (s[i] !== '-') return false
    } else if ('0123456789'.search(s[i]) < 0) return false
  }
  return true
}

document.getElementById('generate').addEventListener('click', function () {
  document.getElementById('result').textContent = ''
  const mathId = document.getElementById('mathId').value.trim()
  if (!checkMathId(mathId)) {
    document.querySelector('#generate').textContent = 'Try Again'
    document.getElementById('result').textContent = 'Bad MathID!'
  } else {
    let activationKey = ''
    for (let i = 0; i < 14; i++) {
      activationKey += Math.floor(Math.random() * 10)
      if (i === 3 || i === 7) activationKey += '-'
    }
    const magicNumbers = [
      10690, 12251, 17649, 24816, 33360, 35944, 36412, 42041, 42635, 44011, 53799, 56181, 58536, 59222, 61041
    ]
    const password = genPassword(
      mathId + '$1&' + activationKey,
      magicNumbers[Math.floor(Math.random() * magicNumbers.length)]
    )
    document.querySelector('#generate').textContent = 'Success'
    document.getElementById('result').textContent += 'Activation Key: ' + activationKey + '\nPassword: ' + password
  }
})

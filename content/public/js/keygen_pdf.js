async function keygen(computerId) {
  async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message) // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8) // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
    return hashHex
  }
  const registrationCode = 'CRACK0BYJINGMATRIX'
  const crypStr1 = await digestMessage(await digestMessage(registrationCode))
  const crypStr2 = await digestMessage(await digestMessage(computerId.slice(0, -4)))
  let mixStr = ''
  for (let i = 0; i < 40; i++) {
    mixStr += crypStr1[i].toString() + crypStr2[i]
  }
  const activationCode = (await digestMessage(mixStr)).toUpperCase() + '0JINGMATRIX'
  //   console.log("Resgitration Code: ", registrationCode);
  //   console.log("Activation Code: ", activationCode);
  return { registrationCode, activationCode }
}

document.querySelector('#activate').addEventListener('click', async () => {
  const computerId = document.querySelector('#computerId').value
  if (computerId.length !== 40) {
    alert(`Invalid computerId with size ${computerId.length}, re-input please!`)
    return
  }
  const { registrationCode, activationCode } = await keygen(computerId)
  document.querySelector('#activate').textContent = 'Success'
  document.getElementById(
    'activateCode'
  ).textContent += `\nRegistration Code: ${registrationCode}\nActivation Code: ${activationCode}`
})

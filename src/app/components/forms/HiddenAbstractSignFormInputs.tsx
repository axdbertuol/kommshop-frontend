import React from 'react'

type Props = {
  provider: string
  formName: string
  idToken: string
}

function HiddenAbstractSignFormInputs({ provider, formName, idToken }: Props) {
  return (
    <>
      <input
        type="hidden"
        id="provider"
        name="provider"
        value={provider}
      />
      <input
        type="hidden"
        id="formName"
        name="formName"
        value={formName}
      />
      <input
        type="hidden"
        id="idToken"
        name="idToken"
        value={idToken}
      />
    </>
  )
}

export default HiddenAbstractSignFormInputs

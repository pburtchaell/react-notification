import React, { useState } from 'react'
import { render } from 'react-dom'
import { Notification } from '../../src/index.js'

function Example() {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <button onClick={() => setVisible(true)}>Show</button>
      <Notification
        visible={visible}
        text="This is a test of the emergency broadcast system"
        onDismiss={() => setVisible(false)}
      />
    </div>
  )
}

render(<Example />, document.querySelector('#mount'))

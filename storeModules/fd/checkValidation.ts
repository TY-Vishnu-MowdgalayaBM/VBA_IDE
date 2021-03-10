export function checkPropertyValue (propertyName: keyof controlProperties, value: any) : boolean {
  let result = true
  switch (propertyName) {
    case 'Left':
    case 'Top':
      result = value > -32767 && value <= 32767
      break
    case 'Width':
    case 'Height':
    case 'TabIndex':
      result = value >= 0 && value <= 32767
      break
    case 'ListRows':
    case 'MaxLength':
    case 'Delay':
      result = value >= 0 && value <= 2147483647
      break
    case 'TabFixedHeight':
    case 'TabFixedWidth':
      result = value >= 0 && value <= 7200
      break
    case 'Zoom':
      result = value >= 10 && value < 401
      break
    case 'BoundColumn':
      result = value >= 0 && value <= 65535
      break
    case 'ColumnCount':
      result = value >= -1 && value < 2147483647
      break
    case 'TextColumn':
      result = value >= -1 && value <= 32768
      break
    case 'Max':
    case 'Min':
    case 'SmallChange':
      result = value >= -2147483648 && value <= 2147483647
      break
    case 'Name':
      const nameRegex = /^[a-zA-Z0-9_]+$/
      result = nameRegex.test(value)
      break
    case 'DrawBuffer':
      result = value >= 16000 && value <= 1048576
      break
    case 'TransitionPeriod':
      result = value >= 0 && value <= 10000
      break
    case 'ScrollHeight' :
    case 'ScrollWidth' :
      result = value >= 0 && value.toString().length < 9
      break
  }
  return result
}

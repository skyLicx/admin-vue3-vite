export interface PrintTemplate {
  [key: string]: {
    label: string
    temp: string
    options: {
      label: string
      value: string
    }[]
  }
}

export interface PrintState {
  templateSelected: {
    [key: string]: string
  }
  printTemplate: PrintTemplate
}

export interface AddonsState {
  corrector: AddonsCorrector
}

export interface AddonsCorrector {
  options: Array<AddonsCorrectorOption>
}

export interface AddonsCorrectorOption {
  title: string
  description: string
  option: boolean
  html: {
    before: string
    after: string
  }
}

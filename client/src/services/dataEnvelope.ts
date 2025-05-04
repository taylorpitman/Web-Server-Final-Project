
export interface DataListEnvelope<T> {
    items: T[]
    total: number
    skip: number
    limit: number
  }
  
  export interface DataEnvelope<T> {
    data: T
  }
  
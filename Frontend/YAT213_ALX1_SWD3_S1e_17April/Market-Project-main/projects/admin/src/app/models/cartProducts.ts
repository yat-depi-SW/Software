export interface cartProducts{
  item:{
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string,
    image2?: string
  }
  quantity:number
}

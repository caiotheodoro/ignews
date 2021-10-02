import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import styles from './home.module.scss'
import { GetServerSideProps } from 'next'
import { stripe } from '../services/stripe'
interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({product} : HomeProps) {


  return (
    <>
      <Head>
        <title>Home | ignews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏Hey, Welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
          <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price =  await stripe.prices.retrieve("price_1JfwXgDqVzUtyqwcW7Fi20ip")

  const  product  = {
    priceID: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format( price.unit_amount / 100),
    
  }

  return {
    props: {
      product
    }
  };
}
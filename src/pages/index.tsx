import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import styles from './home.module.scss'
import { GetStaticProps } from 'next'
import { stripe } from '../services/stripe'
interface HomeProps {
  product: {
    priceId: string,
    amount: string,
  }
}

// client side = useEffect
//serverside = getServerSideProps
// estatico = getStaticProps

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
          <SubscribeButton />
        </section>
          <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => { //carrega a pagina uma vez de acordo com o revalidade.
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
    },
    revalidate: 60 * 60 * 24, //24 horas - tempo de revalidacao (reconstrução da pagina)
  };
}
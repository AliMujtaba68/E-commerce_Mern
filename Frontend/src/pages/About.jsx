import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsLetterBox'

const About = () => {
    return (
        <div>

            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img} />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores excepturi, tempore accusamus deserunt quod assumenda, nemo at ea, quidem hic rem ipsam facilis modi sint laboriosam veritatis maiores! Quae, laborum.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque explicabo, earum sequi mollitia qui debitis amet necessitatibus officia molestiae id sed voluptatem odit. Perferendis, quis nulla nihil eius cum voluptates.</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque molestias cupiditate obcaecati eligendi earum repellendus cum odio iure, tempora omnis officia atque excepturi eveniet cumque veniam totam commodi voluptate. Et!</p>
                </div>
            </div>

            <div className=' text-xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut accusantium nihil, unde ex id ut deserunt quibusdam dolore, eius fuga inventore veniam nobis quod dolores odio ullam officiis repellendus omnis.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi rerum, quisquam libero odio vel est, iste impedit quia magnam earum itaque saepe architecto cum laboriosam, officia nihil totam nostrum rem?</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis libero, iure dolore eaque quaerat, culpa quae ipsam quis doloremque voluptates rem quo nulla dolorum necessitatibus assumenda impedit atque! Deserunt, laudantium.</p>
                </div>
            </div>

            <NewsletterBox />

        </div>
    )
}

export default About

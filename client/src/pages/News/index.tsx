import { IPost, IPosts } from "src/interfaces";
import Post from "src/modules/Post";

const posts: IPosts = [
  {
    title: "This is my first post",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam risus mauris, auctor feugiat dui commodo quis. Maecenas felis erat, cursus a velit sit amet, interdum vestibulum est. Suspendisse aliquet, nisi ac imperdiet euismod, nulla ante bibendum felis, id varius orci libero quis risus. Proin nec magna ut eros varius mollis. Nulla facilisi. Mauris pretium neque et dapibus hendrerit. Quisque aliquam risus sit amet ligula dignissim, id sodales lorem laoreet. Duis gravida, metus sed maximus tempus, lectus tellus viverra risus, eu aliquet sem purus nec leo. Morbi facilisis odio a posuere vehicula. Suspendisse quis varius metus. Fusce ornare ipsum turpis, at vestibulum ligula tincidunt fringilla. Phasellus tristique odio sed mi malesuada volutpat. Aliquam sodales turpis sed justo dapibus ullamcorper. Cras hendrerit eros id lectus lacinia, vitae congue nunc facilisis. Duis interdum ante at tellus varius semper. Proin gravida interdum nibh a placerat. Donec congue egestas vulputate. Etiam vestibulum ante ut mauris sollicitudin sodales. Aliquam dictum urna enim. Quisque sed semper mauris. Praesent nec ultrices justo, non tempus augue. Vestibulum vestibulum lorem sed tempor molestie. Sed fermentum nibh sit amet nibh gravida euismod.",
    views: 5,
  },
  {
    title: "Exploring the Wonders of Deep Learning",
    content:
      "Deep learning is a fascinating field of artificial intelligence that mimics the human brain's neural networks. It has revolutionized various industries, from healthcare to finance, by enabling machines to learn from data. In this post, we delve into the basics of deep learning, its applications, and how it's shaping the future of technology. Deep learning, a subset of machine learning, focuses on neural networks with many layers, known as deep neural networks. These networks are capable of automatically learning and making decisions from data, which makes them suitable for complex tasks like image and speech recognition. The impact of deep learning can be seen in self-driving cars, virtual assistants, and even healthcare diagnostics. As the technology advances, we can expect even more breakthroughs in the near future.",
    views: 120,
  },
  {
    title: "The Art of Sustainable Gardening",
    content:
      "Sustainable gardening is not just a trend; it's a way of life that promotes environmental consciousness. Learn how to create a thriving garden while reducing your ecological footprint. Discover tips for composting, water conservation, and choosing native plants to support local wildlife. Sustainable gardening is all about creating a harmonious ecosystem in your own backyard. It's a holistic approach that takes into consideration the environmental impact of every gardening decision. Composting is a key component of sustainability, as it reduces waste and enriches the soil naturally. Additionally, water conservation practices, such as collecting rainwater, can save both resources and money. Choosing native plants is another essential aspect of sustainable gardening, as they require less maintenance and provide habitat for local wildlife. By adopting these practices, you can be a steward of the environment right in your own garden.",
    views: 85,
  },
  {
    title: "Mastering the Perfect Cup of Coffee",
    content:
      "Coffee lovers unite! We all enjoy a great cup of joe, but have you ever wondered about the science and art behind it? In this post, we explore the history of coffee, brewing methods, and how to grind and brew your beans to perfection. Get ready to elevate your coffee game! Coffee has a rich history that spans centuries and cultures. From its origins in Ethiopia to its global popularity today, coffee has played a significant role in our lives. The perfect cup of coffee involves not only the quality of the beans but also the brewing method. Coffee connoisseurs often grind their beans just before brewing to preserve freshness and aroma. The brewing method, whether it's a French press, pour-over, or espresso machine, can drastically alter the flavor profile of the coffee. By understanding the nuances of coffee preparation, you can enjoy a customized, perfect cup of coffee that suits your taste.",
    views: 240,
  },
  {
    title: "The Power of Mindfulness Meditation",
    content:
      "Mindfulness meditation has gained popularity as a powerful tool for reducing stress and improving mental well-being. This post introduces you to the practice, its benefits, and offers simple techniques to incorporate mindfulness into your daily life. Find inner peace and balance. Mindfulness meditation is a practice rooted in ancient traditions, such as Buddhism. In recent years, it has gained widespread recognition for its positive impact on mental health and well-being. The core principle of mindfulness is being fully present in the moment, without judgment. This practice can reduce stress, anxiety, and improve focus. To start incorporating mindfulness into your daily life, you can begin with short meditation sessions. Focus on your breath, bodily sensations, or the sounds around you. Over time, you'll develop greater self-awareness and find a sense of inner peace and balance.",
    views: 300,
  },
  {
    title: "Traveling Solo: Embrace the Adventure",
    content:
      "Traveling alone can be a transformative experience. Discover the freedom and self-discovery that come with solo adventures. We share personal stories, safety tips, and suggestions for destinations that are perfect for solo travelers. Embrace the world on your terms. Solo travel is an opportunity for personal growth and self-discovery. It offers the freedom to explore the world on your terms, make new connections, and step out of your comfort zone. We'll share personal stories from solo travelers who have encountered kindness and camaraderie in unexpected places. Safety is paramount when traveling alone, so we'll provide practical tips to help you stay secure and enjoy your journey. Additionally, we'll recommend some of the best destinations for solo travelers, whether you seek adventure, relaxation, or cultural immersion. Embrace the adventure, and see the world from a new perspective.",
    views: 150,
  },
  {
    title: "The Marvels of Space Exploration",
    content:
      "From the Moon landing to the search for extraterrestrial life, humanity's exploration of space is an awe-inspiring journey. Join us on an exploration of the cosmos, the latest missions to Mars, and the future of space travel. Uncover the mysteries of the universe! Space exploration has captivated humanity's imagination for generations. From the first human steps on the Moon to the breathtaking images of distant galaxies captured by telescopes, space exploration continues to push the boundaries of human knowledge. In this post, we'll take you on a journey through the cosmos, exploring the history of space exploration and the pivotal moments that have shaped our understanding of the universe. We'll also dive into the latest missions to Mars, the quest for extraterrestrial life, and the promising advancements in space travel technology. Join us as we embark on an epic adventure to uncover the mysteries of the universe and imagine what the future holds for humanity's exploration of the cosmos.",
    views: 180,
  },
];

function Newspage() {
  const handleClick = () => {
    // Сделать что-нибудь при нажатии на компонент Post
  };

  return (
    <>
      <div className="container mx-auto px-2 py-2">
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Post post={post} onClick={handleClick} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Newspage;

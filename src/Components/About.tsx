export const About = () => {
  return (
    <div class="relative w-full">
      <img src='/images/about/kiggy-full.avif' class="block h-auto w-full" alt="Background of about page blurb, picture of artist and gradient below text" />
      <div class="absolute left-1/2 top-1/2 mt-4 w-4/5 -translate-x-1/2 -translate-y-1/2 transform text-left">
        <p class="prose w-1/2 text-wrap font-palatino text-xxs text-black sm:text-xs md:text-sm lg:text-lg xl:text-xl">
          I'm Kristen, welcome to my portfolio site! <br /> I am currently
          finishing my last semester at VCUarts studying illustration. I am also
          working as a visual development artist for{' '}
          <a href="https://www.instagram.com/wcanimated/?hl=en">
            Tlacuache Studios
          </a>{' '}
          on the Warrior Cats Animated project! I love exploring the
          intersection between stylistic simplification, expressive markmaking,
          and technical skill in order to tell immersive stories. More
          specifically, I really enjoy color work and environmental exploration!
          I often spend my free time playing synthesizers or discussing UI and
          website design with my girlfriend.
          <br />
          <br />
          Feel free to contact me at <br />
          <a href="mailto:kristen.rankinarts@gmail.com">
            kristen.rankinarts@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;

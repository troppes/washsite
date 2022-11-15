import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
        adapter: adapter({ out: 'release' })
	}
};

export default config;

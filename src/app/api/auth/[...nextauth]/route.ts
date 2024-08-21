// imports
import axios from "axios";
import NextAuth from "next-auth";
// importing providers
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.Git_clientId as string,
      clientSecret: process.env.Git_clientSecret as string,
    }),
    GoogleProvider({
      clientId: process.env.Google_clientId as string,
      clientSecret: process.env.Google_clientSecret as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_clientId as string,
      clientSecret: process.env.TWITTER_clientSecret as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    LinkedInProvider({
      clientId: process.env.linkdien_clientId as string,
      clientSecret: process.env.linkdien_secreat as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback triggered");
      console.log("User:", user);
      console.log("Account:", account);

      if (user && account) {
        const data = {
          name: user.name,
          email: user.email,
          provider: account.provider,
          profile_image: user.image,
          accessToken: account.access_token,
          skills: [],
          password: "Anish@002",
        };

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/register`,
            data
          );
          console.log("API response:", response.data);
        } catch (error) {
          console.error("API call error:", error);
        }
      }

      return true; // Return true to proceed with the sign-in
    },
    async jwt({ token, user, account }) {
      // Only set these properties when user and account are defined (on initial sign-in)
      if (user && account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

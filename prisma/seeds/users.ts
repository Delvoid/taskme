export const users = [
  {
    name: "Delvoid",
    email: "delvoid.dev@gmail.com",
    accounts: {
      connectOrCreate: [
        {
          where: {
            provider_providerAccountId: {
              provider: "discord",
              providerAccountId: "143743130666139648",
            },
          },
          create: {
            type: "oauth",
            provider: "discord",
            providerAccountId: "143743130666139648",
          },
        },
      ],
    },
  },
];

const categories = [
  {
    id: "Uroda",
    name: 'Uroda',
    color: 'red',
  },
  {
    id: "Gry",
    name: 'Gry',
    color: 'green',
  },
  {
    id: "Wyjazdy",
    name: 'Wyjazdy',
    color: 'teal',
  },
  {
    id: "Zwierzeta",
    name: 'Zwierzęta',
    color: 'blue',
  },
  {
    id: "Moda",
    name: 'Moda',
    color: 'indigo',
  },
  {
    id: "Inne",
    name: 'Inne',
    color: 'fuchsia',
  }
]


const blogPosts = [
  {
    title: "Etiam pulvinar sollicitudin ex sit amet aliquam.",
    subtitle: "Vivamus vel tincidunt metus. Nulla congue urna vitae maximus ultricies. Morbi at augue nunc. Duis varius pretium nibh, sed dignissim neque viverra eu. Sed sed cursus dolor",
    content: "<p>Sed molestie ante vel molestie iaculis. Aenean interdum suscipit urna eu vestibulum. Cras fringilla massa in nunc auctor ultrices. Donec ullamcorper placerat scelerisque. Aenean bibendum quis dolor eu fermentum. Aenean mollis, tellus at consectetur maximus, nibh nisi bibendum massa, ac tempus ante dui eu leo. Etiam maximus nisl sed purus fringilla, et vestibulum libero pulvinar. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse vitae ligula eget lectus varius porta. Donec dolor metus, viverra sit amet orci in, imperdiet convallis mi. In dignissim urna sit amet eros volutpat ultricies. Nam ac ex vitae massa sollicitudin maximus. Proin vulputate pellentesque lobortis.</p>\n" +
      "<p>Morbi bibendum erat id rutrum ultricies. Vivamus hendrerit justo sed tincidunt malesuada. Cras vitae dui et urna ultrices tempus sit amet ut nunc. Duis bibendum ante non metus porta malesuada. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin commodo elementum leo sed aliquet. Maecenas in nunc luctus, facilisis velit et, facilisis arcu. Nulla est nulla, maximus eget enim ac, fringilla egestas sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur urna velit, maximus eget tincidunt convallis, porta at urna. Aenean elementum quis dui vel condimentum.</p>\n" +
      "<p>Nunc porttitor convallis velit, in mattis est interdum ut. Donec vehicula semper laoreet. Nullam vehicula tempus orci sed laoreet. Praesent dapibus magna et eleifend egestas. Cras eget metus iaculis, porttitor massa nec, lobortis massa. Donec cursus ornare erat ac rhoncus. In id lacus turpis.</p>",
    categoryId: "Gry",
    imgURL: "https://res.cloudinary.com/dgii182dt/image/upload/v1682193678/martyna-tv/i8yuxuqzqeadozhvniqo.jpg",
    slug: "etiam-pulvinar-sollicitudin-ex-sit-amet-aliquam.",
  },
  {
    title: "Phasellus mollis, erat non ornare cursus, justo justo eleifend erat",
    subtitle: "VUt venenatis aliquet orci, sed suscipit nulla luctus sit amet. Maecenas nec hendrerit sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;",
    content: "Nullam eros urna, condimentum at scelerisque id, scelerisque euismod tellus. Cras lectus orci, suscipit eleifend varius faucibus, pulvinar at nulla. Aenean tortor urna, tempor in suscipit in, tempor eu mauris. Mauris faucibus sollicitudin porttitor. Nunc quam felis, aliquet maximus mauris nec, fermentum pellentesque dolor. Aenean vehicula lobortis nisl eget dapibus. Vivamus a neque nibh. Aenean quis eleifend lorem, quis sagittis ipsum. Aliquam sit amet augue eros. Morbi id arcu felis. Nullam id turpis neque. Nullam vitae ullamcorper diam. Aliquam tempor semper nisi quis ultricies. In nec purus sodales, elementum libero ac, mollis nisl.\n" +
      "\n" +
      "Aenean vitae ullamcorper dolor. Morbi diam ante, sodales vitae blandit mollis, hendrerit et odio. Praesent felis felis, fringilla mattis ornare vel, iaculis in lorem. Fusce interdum a est at suscipit. Proin ut condimentum odio, at lobortis enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec posuere ornare mi id porttitor. Cras a massa vel urna sodales semper. Vestibulum vitae magna in nisl iaculis placerat. Phasellus cursus iaculis augue, sit amet fermentum mi vestibulum vitae. Nulla blandit eros et accumsan pellentesque. Donec rutrum, lacus egestas dignissim sagittis, risus dui finibus ex, venenatis malesuada elit lectus vitae dui. Donec auctor ex a placerat tempus.\n" +
      "\n" +
      "Aliquam vitae sollicitudin odio. Curabitur dapibus, est non aliquet vulputate, sem enim convallis nisi, eu malesuada lacus libero eu augue. Aliquam eu posuere libero, eget bibendum felis. Morbi laoreet eleifend sapien, non porttitor erat tincidunt viverra. Nunc nec velit consectetur, hendrerit risus ut, luctus augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam luctus ante at erat finibus suscipit. Nunc sed nibh est. Pellentesque vel vulputate tortor, at tincidunt enim. Donec facilisis blandit ligula et molestie. Pellentesque tempus, magna vel imperdiet semper, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis vel sed tortor. Fusce consectetur nec nisl ut iaculis. Praesent eu egestas felis.",
    categoryId: "Uroda",
    imgURL: "https://res.cloudinary.com/dgii182dt/image/upload/v1678221595/martyna-tv/xonm3j7cvcqhhrc5gmng.jpg",
    slug: "phasellus-mollis-erat-non-ornare-cursus-justo-justo-eleifend-erat",
  },

  {
    title: "Liquam vitae sollicitudin odio",
    subtitle: "Pellentesque tempus, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis",
    content: "Nullam eros urna, condimentum at scelerisque id, scelerisque euismod tellus. Cras lectus orci, suscipit eleifend varius faucibus, pulvinar at nulla. Aenean tortor urna, tempor in suscipit in, tempor eu mauris. Mauris faucibus sollicitudin porttitor. Nunc quam felis, aliquet maximus mauris nec, fermentum pellentesque dolor. Aenean vehicula lobortis nisl eget dapibus. Vivamus a neque nibh. Aenean quis eleifend lorem, quis sagittis ipsum. Aliquam sit amet augue eros. Morbi id arcu felis. Nullam id turpis neque. Nullam vitae ullamcorper diam. Aliquam tempor semper nisi quis ultricies. In nec purus sodales, elementum libero ac, mollis nisl.\n" +
      "\n" +
      "Aenean vitae ullamcorper dolor. Morbi diam ante, sodales vitae blandit mollis, hendrerit et odio. Praesent felis felis, fringilla mattis ornare vel, iaculis in lorem. Fusce interdum a est at suscipit. Proin ut condimentum odio, at lobortis enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec posuere ornare mi id porttitor. Cras a massa vel urna sodales semper. Vestibulum vitae magna in nisl iaculis placerat. Phasellus cursus iaculis augue, sit amet fermentum mi vestibulum vitae. Nulla blandit eros et accumsan pellentesque. Donec rutrum, lacus egestas dignissim sagittis, risus dui finibus ex, venenatis malesuada elit lectus vitae dui. Donec auctor ex a placerat tempus.\n" +
      "\n" +
      "Aliquam vitae sollicitudin odio. Curabitur dapibus, est non aliquet vulputate, sem enim convallis nisi, eu malesuada lacus libero eu augue. Aliquam eu posuere libero, eget bibendum felis. Morbi laoreet eleifend sapien, non porttitor erat tincidunt viverra. Nunc nec velit consectetur, hendrerit risus ut, luctus augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam luctus ante at erat finibus suscipit. Nunc sed nibh est. Pellentesque vel vulputate tortor, at tincidunt enim. Donec facilisis blandit ligula et molestie. Pellentesque tempus, magna vel imperdiet semper, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis vel sed tortor. Fusce consectetur nec nisl ut iaculis. Praesent eu egestas felis.",
    categoryId: "Wyjazdy",
    imgURL: "https://res.cloudinary.com/dgii182dt/image/upload/v1678221683/martyna-tv/nlbrhdrqwi68rc73dk5e.jpg",
    slug: "liquam-vitae-sollicitudin-odio",
  },
  {
    title: "Phasellus vitae nisi ut eros ultrices laoreet.",
    subtitle: "Ut ac massa efficitur odio elementum vulputate. Praesent condimentum dictum magna. Fusce at purus a purus elementum vehicula.",
    content: "Nullam eros urna, condimentum at scelerisque id, scelerisque euismod tellus. Cras lectus orci, suscipit eleifend varius faucibus, pulvinar at nulla. Aenean tortor urna, tempor in suscipit in, tempor eu mauris. Mauris faucibus sollicitudin porttitor. Nunc quam felis, aliquet maximus mauris nec, fermentum pellentesque dolor. Aenean vehicula lobortis nisl eget dapibus. Vivamus a neque nibh. Aenean quis eleifend lorem, quis sagittis ipsum. Aliquam sit amet augue eros. Morbi id arcu felis. Nullam id turpis neque. Nullam vitae ullamcorper diam. Aliquam tempor semper nisi quis ultricies. In nec purus sodales, elementum libero ac, mollis nisl.\n" +
      "\n" +
      "Aenean vitae ullamcorper dolor. Morbi diam ante, sodales vitae blandit mollis, hendrerit et odio. Praesent felis felis, fringilla mattis ornare vel, iaculis in lorem. Fusce interdum a est at suscipit. Proin ut condimentum odio, at lobortis enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec posuere ornare mi id porttitor. Cras a massa vel urna sodales semper. Vestibulum vitae magna in nisl iaculis placerat. Phasellus cursus iaculis augue, sit amet fermentum mi vestibulum vitae. Nulla blandit eros et accumsan pellentesque. Donec rutrum, lacus egestas dignissim sagittis, risus dui finibus ex, venenatis malesuada elit lectus vitae dui. Donec auctor ex a placerat tempus.\n" +
      "\n" +
      "Aliquam vitae sollicitudin odio. Curabitur dapibus, est non aliquet vulputate, sem enim convallis nisi, eu malesuada lacus libero eu augue. Aliquam eu posuere libero, eget bibendum felis. Morbi laoreet eleifend sapien, non porttitor erat tincidunt viverra. Nunc nec velit consectetur, hendrerit risus ut, luctus augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam luctus ante at erat finibus suscipit. Nunc sed nibh est. Pellentesque vel vulputate tortor, at tincidunt enim. Donec facilisis blandit ligula et molestie. Pellentesque tempus, magna vel imperdiet semper, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis vel sed tortor. Fusce consectetur nec nisl ut iaculis. Praesent eu egestas felis.",
    categoryId: "Zwierzeta",
    imgURL: "https://res.cloudinary.com/dgii182dt/image/upload/v1681055324/martyna-tv/aqertt9zwsntuivhl1ms.jpg",
    slug: "phasellus-vitae-nisi-ut-eros-ultrices-laoreet",
  },
  {
    title: "Morbi id dolor vel sem tincidunt ullamcorper vitae nec mi. ",
    subtitle: "Nulla ullamcorper suscipit mi vitae congue. Suspendisse sed magna ut magna aliquet eleifend in ac sem. Quisque sed diam a ipsum convallis suscipit. Curabitur semper at augue vitae rhoncus.",
    content: "Nullam eros urna, condimentum at scelerisque id, scelerisque euismod tellus. Cras lectus orci, suscipit eleifend varius faucibus, pulvinar at nulla. Aenean tortor urna, tempor in suscipit in, tempor eu mauris. Mauris faucibus sollicitudin porttitor. Nunc quam felis, aliquet maximus mauris nec, fermentum pellentesque dolor. Aenean vehicula lobortis nisl eget dapibus. Vivamus a neque nibh. Aenean quis eleifend lorem, quis sagittis ipsum. Aliquam sit amet augue eros. Morbi id arcu felis. Nullam id turpis neque. Nullam vitae ullamcorper diam. Aliquam tempor semper nisi quis ultricies. In nec purus sodales, elementum libero ac, mollis nisl.\n" +
      "\n" +
      "Aenean vitae ullamcorper dolor. Morbi diam ante, sodales vitae blandit mollis, hendrerit et odio. Praesent felis felis, fringilla mattis ornare vel, iaculis in lorem. Fusce interdum a est at suscipit. Proin ut condimentum odio, at lobortis enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec posuere ornare mi id porttitor. Cras a massa vel urna sodales semper. Vestibulum vitae magna in nisl iaculis placerat. Phasellus cursus iaculis augue, sit amet fermentum mi vestibulum vitae. Nulla blandit eros et accumsan pellentesque. Donec rutrum, lacus egestas dignissim sagittis, risus dui finibus ex, venenatis malesuada elit lectus vitae dui. Donec auctor ex a placerat tempus.\n" +
      "\n" +
      "Aliquam vitae sollicitudin odio. Curabitur dapibus, est non aliquet vulputate, sem enim convallis nisi, eu malesuada lacus libero eu augue. Aliquam eu posuere libero, eget bibendum felis. Morbi laoreet eleifend sapien, non porttitor erat tincidunt viverra. Nunc nec velit consectetur, hendrerit risus ut, luctus augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam luctus ante at erat finibus suscipit. Nunc sed nibh est. Pellentesque vel vulputate tortor, at tincidunt enim. Donec facilisis blandit ligula et molestie. Pellentesque tempus, magna vel imperdiet semper, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis vel sed tortor. Fusce consectetur nec nisl ut iaculis. Praesent eu egestas felis.",
    categoryId: "Moda",
    imgURL: "https://res.cloudinary.com/dgii182dt/image/upload/v1678221824/martyna-tv/cwlurosv7eidjtcl5kia.jpg",
    slug: "morbi-id-dolor-vel-sem-tincidunt-ullamcorper-vitae-nec-mi",
  },
  {
    title: "Sed iaculis lacinia quam, a tempor neque.",
    subtitle: "Sed nulla nisi, tempus eu blandit vel, varius in magna. Aliquam lacinia, nulla id sagittis ultrices, velit ligula dictum dui, id tempus ante orci a ex. Nam ac lobortis purus.",
    content: "Nullam eros urna, condimentum at scelerisque id, scelerisque euismod tellus. Cras lectus orci, suscipit eleifend varius faucibus, pulvinar at nulla. Aenean tortor urna, tempor in suscipit in, tempor eu mauris. Mauris faucibus sollicitudin porttitor. Nunc quam felis, aliquet maximus mauris nec, fermentum pellentesque dolor. Aenean vehicula lobortis nisl eget dapibus. Vivamus a neque nibh. Aenean quis eleifend lorem, quis sagittis ipsum. Aliquam sit amet augue eros. Morbi id arcu felis. Nullam id turpis neque. Nullam vitae ullamcorper diam. Aliquam tempor semper nisi quis ultricies. In nec purus sodales, elementum libero ac, mollis nisl.\n" +
      "\n" +
      "Aenean vitae ullamcorper dolor. Morbi diam ante, sodales vitae blandit mollis, hendrerit et odio. Praesent felis felis, fringilla mattis ornare vel, iaculis in lorem. Fusce interdum a est at suscipit. Proin ut condimentum odio, at lobortis enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec posuere ornare mi id porttitor. Cras a massa vel urna sodales semper. Vestibulum vitae magna in nisl iaculis placerat. Phasellus cursus iaculis augue, sit amet fermentum mi vestibulum vitae. Nulla blandit eros et accumsan pellentesque. Donec rutrum, lacus egestas dignissim sagittis, risus dui finibus ex, venenatis malesuada elit lectus vitae dui. Donec auctor ex a placerat tempus.\n" +
      "\n" +
      "Aliquam vitae sollicitudin odio. Curabitur dapibus, est non aliquet vulputate, sem enim convallis nisi, eu malesuada lacus libero eu augue. Aliquam eu posuere libero, eget bibendum felis. Morbi laoreet eleifend sapien, non porttitor erat tincidunt viverra. Nunc nec velit consectetur, hendrerit risus ut, luctus augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam luctus ante at erat finibus suscipit. Nunc sed nibh est. Pellentesque vel vulputate tortor, at tincidunt enim. Donec facilisis blandit ligula et molestie. Pellentesque tempus, magna vel imperdiet semper, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis vel sed tortor. Fusce consectetur nec nisl ut iaculis. Praesent eu egestas felis.",
    categoryId: "Inne",
    imgURL: "https://res.cloudinary.com/dgii182dt/image/upload/v1678828351/martyna-tv/chikekaffqf6an10b1el.jpg",
    slug: "sed-iaculis-lacinia-quam-a-tempor-neque",
  },


]


const productCategories = [
  {
    id: "Zawbawki",
    name: "Zabawki",
    color: "red",
  },
  {
    id: "Ubrania",
    name: "Ubrania",
    color: "green",
  }
]


const comments = [
  {

    content: "Phasellus cursus iaculis augue, sit amet fermentum mi vestibulum vitae. Nulla blandit eros et accumsan pellentesque. Donec rutrum, lacus egestas dignissim sagittis, risus dui finibus ex, venenatis malesuada elit lectus vitae dui. Donec auctor ex a placerat tempus. Aliquam vitae sollicitudin odio. Curabitur dapibus, est non aliquet vulputate, sem enim convallis nisi, eu malesuada lacus libero eu augue. Aliquam eu posuere libero, eget bibendum felis. Morbi laoreet eleifend sapien, non porttitor erat tincidunt viverra. Nunc nec velit consectetur, hendrerit risus ut, luctus augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam luctus ante at erat finibus suscipit. Nunc sed nibh est. Pellentesque vel vulputate tortor, at tincidunt enim. Donec facilisis blandit ligula et molestie. Pellentesque tempus, magna vel imperdiet semper, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis vel sed tortor. Fusce consectetur nec nisl ut iaculis. Praesent eu egestas felis.",
    blogPostId: "cliog9rcq0000hy7kyjl74xyt",
    userId: 'clhcbcexg0000hyogr3hh9u56'

  },
  {

    content: "Phasellus cursus iaculis augue, sit amet fermentum mi vestibulum vitae. Nulla blandit eros et accumsan pellentesque. Donec rutrum, lacus egestas dignissim sagittis, risus dui finibus ex, venenatis malesuada elit lectus vitae dui. Donec auctor ex a placerat tempus. Aliquam vitae sollicitudin odio. Curabitur dapibus, est non aliquet vulputate, sem enim convallis nisi, eu malesuada lacus libero eu augue. Aliquam eu posuere libero, eget bibendum felis. Morbi laoreet eleifend sapien, non porttitor erat tincidunt viverra. Nunc nec velit consectetur, hendrerit risus ut, luctus augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam luctus ante at erat finibus suscipit. Nunc sed nibh est. Pellentesque vel vulputate tortor, at tincidunt enim. Donec facilisis blandit ligula et molestie. Pellentesque tempus, magna vel imperdiet semper, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis vel sed tortor. Fusce consectetur nec nisl ut iaculis. Praesent eu egestas felis.",
    blogPostId: "cliog9rcq0001hy7kgibaeq8z",
    userId: 'clhcbcexg0000hyogr3hh9u56'

  },
  {

    content: "Phasellus cursus iaculis augue, sit amet fermentum mi vestibulum vitae. Nulla blandit eros et accumsan pellentesque. Donec rutrum, lacus egestas dignissim sagittis, risus dui finibus ex, venenatis malesuada elit lectus vitae dui. Donec auctor ex a placerat tempus. Aliquam vitae sollicitudin odio. Curabitur dapibus, est non aliquet vulputate, sem enim convallis nisi, eu malesuada lacus libero eu augue. Aliquam eu posuere libero, eget bibendum felis. Morbi laoreet eleifend sapien, non porttitor erat tincidunt viverra. Nunc nec velit consectetur, hendrerit risus ut, luctus augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam luctus ante at erat finibus suscipit. Nunc sed nibh est. Pellentesque vel vulputate tortor, at tincidunt enim. Donec facilisis blandit ligula et molestie. Pellentesque tempus, magna vel imperdiet semper, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis vel sed tortor. Fusce consectetur nec nisl ut iaculis. Praesent eu egestas felis.",
    blogPostId: "cliog9rcq0002hy7k25ufbrrj",
    userId: 'clhcbcexg0000hyogr3hh9u56'

  },
  {

    content: "Phasellus cursus iaculis augue, sit amet fermentum mi vestibulum vitae. Nulla blandit eros et accumsan pellentesque. Donec rutrum, lacus egestas dignissim sagittis, risus dui finibus ex, venenatis malesuada elit lectus vitae dui. Donec auctor ex a placerat tempus. Aliquam vitae sollicitudin odio. Curabitur dapibus, est non aliquet vulputate, sem enim convallis nisi, eu malesuada lacus libero eu augue. Aliquam eu posuere libero, eget bibendum felis. Morbi laoreet eleifend sapien, non porttitor erat tincidunt viverra. Nunc nec velit consectetur, hendrerit risus ut, luctus augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam luctus ante at erat finibus suscipit. Nunc sed nibh est. Pellentesque vel vulputate tortor, at tincidunt enim. Donec facilisis blandit ligula et molestie. Pellentesque tempus, magna vel imperdiet semper, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis vel sed tortor. Fusce consectetur nec nisl ut iaculis. Praesent eu egestas felis.",
    blogPostId: "cliog9rcq0004hy7krza8kug0",
    userId: 'clhcbcexg0000hyogr3hh9u56'

  },
  {

    content: "Phasellus cursus iaculis augue, sit amet fermentum mi vestibulum vitae. Nulla blandit eros et accumsan pellentesque. Donec rutrum, lacus egestas dignissim sagittis, risus dui finibus ex, venenatis malesuada elit lectus vitae dui. Donec auctor ex a placerat tempus. Aliquam vitae sollicitudin odio. Curabitur dapibus, est non aliquet vulputate, sem enim convallis nisi, eu malesuada lacus libero eu augue. Aliquam eu posuere libero, eget bibendum felis. Morbi laoreet eleifend sapien, non porttitor erat tincidunt viverra. Nunc nec velit consectetur, hendrerit risus ut, luctus augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam luctus ante at erat finibus suscipit. Nunc sed nibh est. Pellentesque vel vulputate tortor, at tincidunt enim. Donec facilisis blandit ligula et molestie. Pellentesque tempus, magna vel imperdiet semper, nisi tellus pellentesque ante, at auctor elit massa ac nulla. Integer in quam purus. Vivamus finibus lacus vel venenatis tempor. Morbi sit amet eros ac nunc aliquet mollis vel sed tortor. Fusce consectetur nec nisl ut iaculis. Praesent eu egestas felis.",
    blogPostId: "cliog9rcq0005hy7kfs6guad7",
    userId: 'clhcbcexg0000hyogr3hh9u56'

  },

]

const products = [
  {
    price: 5.99,
    name: 'Babeczki czekoladowe',
    shortDescription: 'Babeczki do jedzenia',
    description: 'Zafunduj mi porządny przysmak',
    imgURL: 'https://res.cloudinary.com/dgii182dt/image/upload/v1685908831/martyna-tv/okugk9c7hjnxn23phfyd.jpg',
    slug: 'babeczki-czekoladowe',
    categoryId: 'Zawbawki'
  },
  {
    price: 2,
    name: 'Soczek',
    shortDescription: 'Kup mi soczek, napiję sie po ciężkiej pracy',
    description: 'Kup mi soczek, napiję sie po pracy',
    imgURL: 'https://res.cloudinary.com/dgii182dt/image/upload/v1685908501/martyna-tv/u6ml9zdioee7hmiimlhc.jpg',
    slug: 'maly-soczek',
    categoryId: 'Zawbawki',

  },
  {
    price: 3.49,
    name: 'Czekolada',
    shortDescription: 'Smaczna czekolada',
    description: 'Kup mi czekoladę na wzmocnienie',
    imgURL: 'https://res.cloudinary.com/dgii182dt/image/upload/v1685908688/martyna-tv/nqzaz5iesizfkoshcnnv.jpg',
    slug: 'czekolada',
    categoryId: 'Zawbawki',

  }
]


const films = [
  {
    title: 'Skyrim',
    subtitle: 'Ambient music',
    slug: 'skyrim',
    url: 'https://www.youtube.com/embed/yFDo_uR4-cc',
    userId:'clip2izd20004hyfsywc78h2g'
  },
  {
    title: 'Witcher 3',
    subtitle: 'Ambient music',
    slug: 'witcher-3',
    url: 'https://www.youtube.com/embed/fuQ-nObE3c4',
    userId:'clip2izd20004hyfsywc78h2g'
  },
  {
    title: 'Lofi Girl',
    subtitle: 'Ambient music',
    slug: 'lofi-girl',
    url: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    userId:'clip2izd20004hyfsywc78h2g'
  },
]

module.exports = {
  categories,
  blogPosts,
  productCategories,
  comments,
  products,
  films
}

export const dataOptions = {
  editorOption: {
    // Some Quill options...
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link']
      ]
    }
  },

  sectionOrders: [
    'profile',
    'educations',
    'workExperiences',
    'socialProfiles',
    'skills'
  ],

  addSections: [
    { name_en: 'Courses', value: 'courses', active: false },
    { name_en: 'Internships', value: 'internships', active: false },
    { name_en: 'Languages', value: 'languages', active: false },
    { name_en: 'Activities', value: 'activities', active: false },
    { name_en: 'Hobbies', value: 'hobbies', active: false },
    { name_en: 'References', value: 'references', active: false }
  ],
  sectionOrdersSubTitle: {
    educations: {
      title: 'Education',
      sub_title: 'If relevant, include your most recent educational achievements and the dates here'
    },
    workExperiences: {
      title: 'Employment History',
      sub_title: 'Include your last 10 years of relevant experience and dates in this section. List your most recent ' +
        'position first.'
    },
    socialProfiles: {
      title: 'Websites & Social Links',
      sub_title: 'You can add links to websites you want hiring managers to see! Perhaps It will be a link to your ' +
        'portfolio, LinkedIn profile, or personal website'
    },
    skills: {
      title: 'Skills',
      sub_title: null
    },
    courses: {
      title: 'Courses',
      sub_title: null
    },
    internships: {
      title: 'Internships',
      sub_title: null
    },
    languages: {
      title: 'Languages',
      sub_title: null
    },
    activities: {
      title: 'Activities',
      sub_title: null
    },
    hobbies: {
      title: 'Hobbies',
      sub_title: null
    },
    references: {
      title: 'References',
      sub_title: null
    }
  },
  customSections: [
    {
      externalId: '2293734973',
      id: 4311827,
      title: 'Hello',
      editable: false,
      items: [
        {
          cid: null,
          city: 'werqwe',
          createdAt: '2020-12-08T06:36:40.345+01:00',
          start_date: '2020-01-08',
          end_date: '2020-03-08',
          description: '<p>ewrqrwe</p>',
          id: 4577769,
          isDateUntilPresent: null,
          isMonthFromHidden: null,
          isMonthUntilHidden: null,
          position: 1,
          sectionId: 4311827,
          title: 'ewrwqe',
          updatedAt: '2020-12-08T06:43:30.278+01:00'
        }
      ]
    },
    {
      externalId: '2293733234',
      id: 4311826,
      title: 'World',
      editable: false,
      items: [
        {
          cid: null,
          city: 'werqwe',
          createdAt: '2020-12-08T06:36:40.345+01:00',
          start_date: '2020-05-08',
          end_date: '2020-09-08',
          description: '<p>ewrqrwe</p>',
          id: 4577769,
          isDateUntilPresent: null,
          isMonthFromHidden: null,
          isMonthUntilHidden: null,
          position: 1,
          sectionId: 4311827,
          title: 'ewrwqe',
          updatedAt: '2020-12-08T06:43:30.278+01:00'
        }
      ]
    }
  ],
  educations: [
    {
      cid: null,
      city: null,
      createdAt: '2020-12-04T08:10:44.450+01:00',
      dateFrom: '2020-12-04',
      dateUntil: null,
      degree: null,
      description: null,
      id: 13978109,
      isDateUntilPresent: false,
      isMonthFromHidden: false,
      isMonthUntilHidden: false,
      level: null,
      position: 1,
      resumeId: 11021246,
      school: null,
      updatedAt: '2020-12-07T05:01:10.713+01:00'
    }
  ]
}

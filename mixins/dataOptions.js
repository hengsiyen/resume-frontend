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
    'skills',
    'courses',
    'references',
    'internships'
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
    references: {
      title: 'References',
      sub_title: null
    },
    internships: {
      title: 'Internships',
      sub_title: null
    }
  },

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

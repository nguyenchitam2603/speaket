import * as Routes from './../../app.routes';

export const menuItemMap = {
    link: '/',
    subMenuItems: [
      {
        name: 'Helpers',
        subMenuItems: [
          {
            name: 'Calculator',
            link: Routes.calculatorUrl
          },
          {
            name: 'Engineer',
            link: Routes.engineerUrl
          },
          {
            name: 'Github',
            link: Routes.githubUrl
          }
        ]
      }
    ]
  }
  
import { createClient } from '@usewaypoint/client'
import dotenv from 'dotenv'
dotenv.config()

export const sendEmail = async (template, email) => {
  let templateId
  switch (template) {
    case 'login':
      templateId = 'wptemplate_EjkTvzBGMd2HhyeW'
      break
    case 'register':
      templateId = 'wptemplate_w2i6oYB2EF7EDo9B'
      break
    case 'update-profile':
      templateId = 'wptemplate_vsayWqBffLV1VUxc'
      break
    case 'form-submit':
      templateId = 'wptemplate_JFeiGeg96dqyZV6V'
      break
    case 'request-update':
      templateId = 'wptemplate_veJ65gJ8dz7TxhqQ'
      break
    case 'request-approve':
      templateId = 'wptemplate_6upRJGhi5BRHGVnj'
      break
    default:
      templateId = 'wptemplate_EjkTvzBGMd2HhyeW'
      break
  }

  const client = createClient(
    process.env.WAYPOINT_USN,
    process.env.WAYPOINT_PSW
  )

  await client.emailMessages.createTemplated({
    templateId: templateId,
    to: email,
  })
}

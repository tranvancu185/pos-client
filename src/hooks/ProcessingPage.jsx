import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile } from 'src/apis/user/user'
import Loader from 'src/components/common/Loader'

import useAuthStore from 'src/stores/authStore'

const ProcessingPage = () => {
  const navigate = useNavigate()
  const { setProfileInfo } = useAuthStore()
  const { token, isLoading } = useAuthStore((state) => state)

  useEffect(() => {
    if (!token) {
      navigate('/auth/logout')
    } else {
      fetchProfile({
        successCallBack: (response) => {
          if (response?.data && response?.status === 200) {
            setProfileInfo(response.data)
          } else {
            navigate('/auth/logout')
          }
        },
        errorCallBack: (response) => {
          navigate('/auth/logout')
        },
      })
    }
  }, [token])

  const fetchProfile = async ({ successCallBack = false, errorCallBack = false }) => {
    try {
      const response = await getProfile()
      if (response.status === 200) {
        if (typeof successCallBack === 'function') {
          successCallBack(response)
        }
      } else {
        if (typeof errorCallBack === 'function') {
          errorCallBack(response)
        }
      }
    } catch (error) {
      console.error('Error:', error)
      // TODO: handle error here
    }
  }

  if (isLoading) {
    return <Loader />
  }
  return <></>
}

export default ProcessingPage

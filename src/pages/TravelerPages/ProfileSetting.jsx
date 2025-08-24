import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Paper,
  Tab,
  Tabs,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import TabPanel from '../../components/Traveler/TabPanel'
import HeadingSmall from '../../components/common/HeadingSmall'
import AccountSetting from '../../components/Traveler/AccountSetting'
import LoginSecurity from '../../components/Traveler/LoginSecurity'



export default function ProfileSetting() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const [tabValue, setTabValue] = useState(() => {
    const saved = localStorage.getItem('profileTab')
    return saved ? parseInt(saved, 10) : 0
  })

  const contentRef = useRef(null)

  const handleTabChange = (_evt, newValue) => {
    newValue = Math.max(0, Math.min(newValue, 2))
    setTabValue(newValue)
    localStorage.setItem('profileTab', newValue)
  }

  // scroll into view on mobile
  useEffect(() => {
    if (isSmall && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [tabValue, isSmall])

  return (
    <div>
      <HeadingSmall text="My Profile" />

      <div className="mt-8">
        <Paper
          ref={contentRef}
          elevation={0}
          sx={{
            p: { md: 4, xs: 0 },
            backgroundColor: '#fafafa',
            borderRadius: 2,
            boxShadow: '0 4px 4px rgba(0,0,0,0.1)',
          }}
        >
          {/* Tabs + custom chevrons */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isSmall && (
              <IconButton
                size="small"
                onClick={() => handleTabChange(null, tabValue - 1)}
                disabled={tabValue === 0}
              >
                <ArrowBackIosNewIcon fontSize="inherit" />
              </IconButton>
            )}

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="off"          
              sx={{
                flex: 1,
                minHeight: 48,
                '& .MuiTabs-flexContainer': { flexWrap: 'nowrap' },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#666',
                  whiteSpace: 'nowrap',
                  px: { xs: '22%', md: '16px' },
                  '&.Mui-selected': { color: '#468F9D' },
                },
                '& .MuiTabs-indicator': { backgroundColor: '#468F9D' },
              }}
            >
              <Tab label="Account Setting" />
              <Tab label="Login & Security" />
              
            </Tabs>

            {isSmall && (
              <IconButton
                size="small"
                onClick={() => handleTabChange(null, tabValue + 1)}
                disabled={tabValue === 2}
              >
                <ArrowForwardIosIcon fontSize="inherit" />
              </IconButton>
            )}
          </Box>

          {/* Tab Panels */}
          <TabPanel value={tabValue} index={0}>
            <AccountSetting onNext={() => handleTabChange(null, tabValue + 1)} />
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <LoginSecurity onNext={() => handleTabChange(null, tabValue + 1)} />
          </TabPanel>

          
        </Paper>
      </div>
    </div>
  )
}



import MenuIcon from '@mui/icons-material/Menu'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import QuizIcon from '@mui/icons-material/Quiz'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  Button,
  ButtonGroup,
  CssBaseline,
  CssVarsProvider,
  IconButton,
  Input,
  Sheet,
  Table,
  Typography,
} from '@mui/joy'

import { useState } from 'react'
import ColorSchemeToggle from '../components/ColorSchemeToggle'
import { Layout } from '../components/Layout'
import { headers } from '../utils/constants/questions'
import CreateQuestionModal from '../features/questionBank/components/CreateQuestionModal'

const Home: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Layout.Root>
        <Layout.Header>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <QuizIcon />
            <Box display="flex" flexDirection="column">
              <Typography component="h1" fontWeight="xl">
                Assignment 1
              </Typography>
              <Typography level="body-xs">by CS3219 Team 4</Typography>
            </Box>
          </Box>
          <Input
            size="md"
            variant="outlined"
            placeholder="Search for questions"
            startDecorator={<SearchRoundedIcon color="primary" />}
            sx={{
              flexBasis: '500px',
              display: {
                xs: 'none',
                sm: 'flex',
              },
              boxShadow: 'sm',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="neutral"
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            >
              <SearchRoundedIcon />
            </IconButton>
            <Button
              size="md"
              startDecorator={<Add />}
              onClick={() => {
                setIsCreateOpen(true)
              }}
            >
              Create new question
            </Button>
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
          >
            <Sheet
              variant="outlined"
              sx={{ borderRadius: 'sm', gridColumn: '1/-1' }}
            >
              <Table
                sx={{
                  '--TableCell-paddingX': '1rem',
                  '--TableCell-paddingY': '1rem',
                }}
              >
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th>{header}</th>
                    ))}
                    {/* for action buttons */}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Sample Title</td>
                    <td>Sample Description</td>
                    <td>Sample Category</td>
                    <td>
                      <Typography level="body-sm" color="success">
                        Easy
                      </Typography>
                    </td>
                    <td>
                      <ButtonGroup spacing="0.5rem">
                        <Button size="sm">View details</Button>
                        <IconButton size="sm" variant="solid" color="danger">
                          <DeleteIcon />
                        </IconButton>
                      </ButtonGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Sheet>
          </Box>
        </Layout.Main>
      </Layout.Root>
      <CreateQuestionModal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false)
        }}
      />
    </CssVarsProvider>
  )
}

export default Home

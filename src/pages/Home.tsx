import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import QuizIcon from '@mui/icons-material/Quiz'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
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
import CreateQuestionModal from '../features/questionBank/components/CreateQuestionModal'
import { selectQuestionBank } from '../features/questionBank/selectors'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { headers } from '../utils/constants/questions'
import { getComplexityColor } from '../utils/helpers'
import QuestionDetailsModal from '../features/questionBank/components/QuestionDetailsModal'
import {
  removeQuestion,
  setCurrentQuestion,
} from '../features/questionBank/slice'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const questionBank = useAppSelector(selectQuestionBank)

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [isDetailOpen, setIsDetailsOpen] = useState<boolean>(false)

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
                    {headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                    {/* for action buttons */}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {questionBank.questionsList.map((question) => (
                    <tr key={question.id}>
                      <td>{question.id}</td>
                      <td>{question.title}</td>
                      <td>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {question.category.map((cat) => (
                            <Chip key={cat} color="primary" variant="solid">
                              {cat}
                            </Chip>
                          ))}
                        </Box>
                      </td>
                      <td>
                        <Typography
                          level="body-sm"
                          color={getComplexityColor(question.complexity)}
                        >
                          {question.complexity}
                        </Typography>
                      </td>
                      <td>
                        <ButtonGroup spacing="0.5rem">
                          <Button
                            size="sm"
                            onClick={() => {
                              setIsDetailsOpen(true)
                              dispatch(setCurrentQuestion(question))
                            }}
                          >
                            View details
                          </Button>
                          <IconButton
                            size="sm"
                            variant="solid"
                            color="danger"
                            onClick={() => {
                              dispatch(removeQuestion(question.id))
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
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
      <QuestionDetailsModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailsOpen(false)
        }}
      />
    </CssVarsProvider>
  )
}

export default Home

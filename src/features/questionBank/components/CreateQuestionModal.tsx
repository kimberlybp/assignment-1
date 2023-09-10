import {
  Alert,
  Box,
  Chip,
  FormHelperText,
  Option,
  Select,
  useColorScheme,
} from '@mui/joy'
import Button from '@mui/joy/Button'
import ChipDelete from '@mui/joy/ChipDelete'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { useCallback, useEffect, useState } from 'react'
import { SimpleMdeReact } from 'react-simplemde-editor'

import 'easymde/dist/easymde.min.css'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { addNewQuestion } from '../slice'
import { DraftQuestion, QuestionComplexity } from '../types'
import { selectQuestionBank } from '../selectors'

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateQuestionModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props
  const { mode } = useColorScheme()
  const questionBank = useAppSelector(selectQuestionBank)
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [categoryInput, setCategoryInput] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])
  const [complexity, setComplexity] = useState<QuestionComplexity>(
    QuestionComplexity.Easy,
  )
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    duplicate: false,
  })

  useEffect(() => {}, [])

  const validateSubmission = () => {
    const errors = {
      title: '',
      description: '',
      category: '',
      duplicate: false,
    }
    if (title === '') {
      errors.title = 'Question title is required'
    }
    if (description === '') {
      errors.description = 'Question description is required'
    }
    if (categories.length === 0) {
      errors.category = 'Add at least 1 category'
    }

    const questionList = questionBank.questionsList
    const duplicate = questionList.find(
      (q) => q.title.toLowerCase() === title.toLowerCase(),
    )
    errors.duplicate = !!duplicate

    setErrors(errors)

    return (
      errors.title === ''
      && errors.description === ''
      && errors.category === ''
      && !errors.duplicate
    )
  }

  const onDescriptionChange = useCallback((value: string) => {
    setDescription(value)
  }, [])

  const onAddCategory = () => {
    if (categories.includes(categoryInput)) {
      setErrors({
        ...errors,
        category: 'This category was already added!',
      })
      return
    }
    const updated = categories
    updated.push(categoryInput)
    setCategories(updated)
    setCategoryInput('')
  }

  const onRemoveCategory = (valueToRemove: string) => {
    const updated: string[] = categories.filter(
      (categoryValue) => categoryValue !== valueToRemove,
    )
    setCategories(updated)
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        ...(mode === 'dark' && {
          '.EasyMDEContainer .CodeMirror': {
            border: '1px solid #32383E',
          },
          '.editor-toolbar': {
            borderTop: '1px solid #32383E',
            borderLeft: '1px solid #32383E',
            borderRight: '1px solid #32383E',
          },
          '.CodeMirror-cursor': {
            borderLeft: '1px solid #FFF',
          },
          '.editor-toolbar button:hover, .editor-toolbar button.active': {
            background: '#24272B',
            borderColor: '#32383E',
          },
          '.CodeMirror': {
            color: '#FFF',
          },
          '.editor-preview': {
            background: '#121416',
          },
        }),
      }}
    >
      <ModalDialog sx={{ maxWidth: 700, width: '100%', overflowY: 'scroll' }}>
        <Typography level="h2">Create new question</Typography>
        <Typography mb={2}>Fill in the information of the question.</Typography>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            const isValid = validateSubmission()
            if (isValid) {
              const draftQns: DraftQuestion = {
                title,
                description,
                category: categories,
                complexity,
              }
              dispatch(addNewQuestion(draftQns))
              onClose()
            }
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <SimpleMdeReact
                value={description}
                onChange={onDescriptionChange}
              />
            </FormControl>
            <FormControl error={errors.category !== ''}>
              <FormLabel>Category</FormLabel>
              <Input
                value={categoryInput}
                onChange={(e) => {
                  setCategoryInput(e.target.value)
                  if (errors.category !== '') {
                    setErrors({
                      ...errors,
                      category: '',
                      duplicate: false,
                    })
                  }
                }}
                endDecorator={<Button onClick={onAddCategory}>Add</Button>}
              />
              <FormHelperText>{errors.category}</FormHelperText>
              <Box mt={2} display="flex" sx={{ width: '100%' }}>
                <Box
                  role="group"
                  sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                >
                  {categories.map((categoryValue, index) => (
                    <Chip
                      key={`${categoryValue}-${index}`}
                      variant="soft"
                      color="primary"
                      endDecorator={(
                        <ChipDelete
                          onDelete={() => onRemoveCategory(categoryValue)}
                        />
                      )}
                    >
                      {categoryValue}
                    </Chip>
                  ))}
                </Box>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel>Complexity</FormLabel>
              <Select
                value={complexity}
                onChange={(_e, newValue) => setComplexity(newValue ?? QuestionComplexity.Easy)}
              >
                <Option value={QuestionComplexity.Easy}>Easy</Option>
                <Option value={QuestionComplexity.Medium}>Medium</Option>
                <Option value={QuestionComplexity.Hard}>Hard</Option>
              </Select>
            </FormControl>
            {errors.duplicate && (
              <Alert variant="soft" color="danger">
                A question with a similar title already exists!
              </Alert>
            )}
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  )
}

export default CreateQuestionModal

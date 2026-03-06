import { LockIcon, WarningCircleIcon } from '@phosphor-icons/react'
import {
  StyledFormField,
  TooltipContent,
  ValidationErrorMessage,
} from './styles'
import * as Tooltip from '@radix-ui/react-tooltip'
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  Ref,
  TextareaHTMLAttributes,
} from 'react'

interface FormFieldProps {
  name: string
  type?: 'input' | 'textarea'
  placeholder?: string
  label?: string
  isDisabled?: boolean
  disabledMessage?: string
  hasValidationError?: boolean
  validationErrorMessage?: string
  defaultValue?: string
  realtimeValue?: string
  onChange?: (_event: ChangeEvent<any>) => void
  required?: boolean
}

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps &
    InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>
>(function FormField(
  {
    name,
    type = 'input',
    placeholder,
    label,
    isDisabled = false,
    disabledMessage = "You can't fill in this field",
    hasValidationError = false,
    validationErrorMessage = 'This field is incorrect',
    defaultValue,
    realtimeValue,
    onChange,
    required,
    ...rest
  },
  ref,
) {
  return (
    <StyledFormField>
      {label && (
        <span>
          {label}
          {isDisabled && (
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <LockIcon />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <TooltipContent sideOffset={5}>
                    {disabledMessage}
                    <Tooltip.Arrow className="TooltipArrow" />
                  </TooltipContent>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          )}
        </span>
      )}

      {type === 'input' && (
        <input
          ref={ref as Ref<HTMLInputElement>}
          type="text"
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={realtimeValue}
          onChange={onChange}
          required={required}
          disabled={isDisabled}
          {...rest}
        />
      )}

      {type === 'textarea' && (
        <textarea
          ref={ref as Ref<HTMLTextAreaElement>}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={realtimeValue}
          onChange={onChange}
          required={required}
          disabled={isDisabled}
          {...rest}
        />
      )}

      {hasValidationError && (
        <ValidationErrorMessage>
          <WarningCircleIcon size={16} />
          {validationErrorMessage}
        </ValidationErrorMessage>
      )}
    </StyledFormField>
  )
})
